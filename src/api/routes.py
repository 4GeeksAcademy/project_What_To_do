"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Comment
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

import requests
from email.message import EmailMessage
import smtplib
from datetime import datetime, timedelta
import ssl
import uuid
from urllib.parse import unquote, quote
import secrets
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token
import os
from dotenv import load_dotenv

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


def getUsers():
    users = User.query.all()
    allUsers = list(map(lambda x: x.serialize(), users))

    return jsonify(allUsers), 200

@api.route('/posts', methods=['GET'])
@jwt_required()
def getPosts():
    current_user_id = get_jwt_identity() 
    posts = Post.query.filter_by(user_id = current_user_id)
    allPosts = list(map(lambda x: x.serialize(), posts))

    return jsonify(allPosts), 200

def getComments(post_id):
    current_user_id = get_jwt_identity()
    post = Post.query.filter_by(id=post_id)
    singlePost = list(map(lambda x: x.serialize(), post))
    
    comments = Comment.query.filter_by(post_id=post_id)
    allComments = list(map(lambda x: x.serialize(), comments))

    for comment in allComments:
        
        author = User.query.filter_by(id = comment['author']).first()
        comment["author_name"] = author.first_name + " " + author.last_name
        comment["current_user"] = current_user_id
    
    for post in singlePost:
        post["comments"] = allComments
        user = User.query.filter_by(id = post['user_id']).first()
        post["name"] = user.first_name + " " + user.last_name


    return jsonify(singlePost), 200

# @api.route('/signup', methods=['POST'])
# def createUser():
#     first_name = request.json.get('first_name')
#     last_name = request.json.get('last_name')
#     password = request.json.get('password')
#     email = request.json.get('email')

#     user = User.query.filter_by(email=email).first()
#     if user != None:
#         return jsonify({"msg": "email exist"}), 401
#     user= User(first_name=first_name, last_name=last_name, password=password, email=email)
#     db.session.add(user)
#     db.session.commit()
    
#     response_body ={
#         "msg": "User successfully added"
#     }

#     return jsonify(response_body), 200

@api.route('/createpost', methods=['POST'])
@jwt_required()
def createPost():
    current_user_id = get_jwt_identity() 

    # try:
    place_name = request.form.get("place_name")
    stay = request.form.get("stay")
    activities = request.form.get("activities")
    transportation = request.form.get("transportation")
    tips = request.form.get("tips")
    social_media=request.files.get('social_media')
    
    imgbb_response = uploadMediaToImgBB(social_media)

    # Save URL in the db
    post = Post(
        user_id=current_user_id,
        place_name=place_name,
        stay=stay,
        activities=activities,
        transportation=transportation,
        tips=tips,
        social_media=imgbb_response.get('url')  
    )

    db.session.add(post)
    db.session.commit()

    response_body = {
        "msg": "Post successfully added",
        "post_id": post.id  
    }

    return jsonify(response_body), 201 

def uploadMediaToImgBB(social_media):
    # Upload media to ImgBB and get the URL
    imgbb_url = "https://api.imgbb.com/1/upload?key=a4164c53da6c55c20d8544a12de89add"
    imgbb_response = requests.post(imgbb_url, files={'image': social_media})
    return imgbb_response.json().get('data')

@api.route('/createcomment', methods=['POST'])
@jwt_required()
def createComment():
    user_id = get_jwt_identity()
    post_id = request.json.get("post_id")
    comment = request.json.get("comment")

    comment = Comment(user_id = user_id, post_id = post_id, comment = comment)

    db.session.add(comment)
    db.session.commit()

    response_body = {
        "msg": "Comment successfully added "
    }

    return jsonify(response_body), 200

#signUp
@api.route('/signup', methods=['POST'])
def createUser():
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    password = request.json.get("password")
    email = request.json.get("email")

    user = User.query.filter_by(email=email).first()
    if user != None:
        return jsonify({"msg": "email exists"}), 401
    
    user = User(first_name=first_name, last_name=last_name ,password=password, email = email)
    db.session.add(user)
    db.session.commit()
    
    response_body = {
        "msg": "User successfully added"
    }

    return jsonify(response_body), 200


#login
@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email")
    password = request.json.get("password")
    
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        
        return jsonify({"msg": "Bad email or password"}), 401
    
  
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }) ,200

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()    
    user = User.query.get(current_user_id)

    if user == None:
        response_body = {
            "msg": "Please login to continue"
        }
        return jsonify(response_body)