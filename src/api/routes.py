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

@api.route('/signup', methods=['POST'])
def createUser():
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    password = request.json.get('password')
    email = request.json.get('email')

    user = User.query.filter_by(email=email).first()
    if user != None:
        return jsonify({"msg": "email exist"}), 401
    user= User(first_name=first_name, last_name=last_name, password=password, email=email)
    db.session.add(user)
    db.session.commit()
    
    response_body ={
        "msg": "User successfully added"
    }

    return jsonify(response_body), 200