const apiUrl = process.env.BACKEND_URL;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
				token: null,
				user: null,
				users: [],
				loggedInAs: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			//GET USERS
			getUsers: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(apiUrl + "/api/users")
					const data = await resp.json()
					setStore({ users: data })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},


			//GO PRIVATE
			goPrivate: async ()=> {
				try{
				  let response = await fetch(apiUrl+"/api/private",{
				  headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}		
				})
				let data = await response.json()
				if (data && data != undefined) {
					  setStore({loggedInAs:data.logged_in_as})
						console.log("congrats user "+data.logged_in_as+" you have access")
						return true;
					  }
		  
				}catch(error){
				  console.log(error);
				}
				  
				},

			//SIGNUP MEMBER
			signUp: async (form, navigate) => {
					const url = apiUrl+"/api/signup";
					await fetch(url, {
						method: "Post",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"first_name": form.first_name,
							"last_name": form.last_name,					
							"email": form.email,
							"password": form.password,
						})					
					})
					.then(async resp => {
						console.log(resp.ok); // will be true if the response is successfull
						console.log(resp.status); // the status code = 200 or code = 400 etc.
						if(!resp.ok) {
							alert("user already exists");
							return false;
						}
						await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
						navigate('/login');														
					})
					.catch(error => {
						//error handling
						console.log(error);
					})
				},


				//LOGIN MEMBER
				login: (form, navigate) => {
					const store = getStore();
					const url = apiUrl+"/api/token";
					fetch(url, {
						method: "Post",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({						
							"email": form.email,
							  "password": form.password
						})					
					})
					.then(async resp => {
						console.log(resp.ok); // will be true if the response is successfull
						console.log(resp.status); // the status code = 200 or code = 400 etc.
						if(!resp.ok){
							alert("Wrong email or password");
							return false;						
						}
						//console.log(resp.text()); // will try return the exact result as string
						const data = await resp.json();
						sessionStorage.setItem("token", data.token);
						setStore({token: data.token});
						
						console.log(store.token);
						navigate('/profile');
					})				
					.catch(error => {
						//error handling
						console.log(error);
					})
				},
				

				//LOGOUT MEMBER
				logout: (navigate) => {			
					setStore({user:null});
					sessionStorage.removeItem("token");
					setStore({token: null});
					navigate("/");
				},


				//MEMBER AUTHENTIFICATION
				authenticateUser: (navigate) => {
					
					
					const url = apiUrl+"/api/private"
					fetch(url, {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + sessionStorage.getItem("token")
						}
					})
					.then(resp => {
						console.log(resp.ok); // will be true if the response is successfull
						console.log(resp.status); // the status code = 200 or code = 400 etc.
						if(!resp.ok){
							navigate("/login");
							alert("Please login to continue");
													
						}
						
						//console.log(resp.text()); // will try return the exact result as string
						return resp.json()
					})
					.then(data => {
						setStore({user: data.user});
						console.log(data);
						return true
						
					})
					.catch(error => {
						//error handling
						console.log(error);
					})
				},

		//RESET PASSWORD
		sendResetPasswordLink: async (email) => {
			const url = `${apiUrl}/api/forgotpassword`;
		  
			try {
			  const response = await fetch(url, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			  });
		  
			  if (response.ok) {
				const data = await response.json();
				console.log('Reset link sent successfully:', data);
			  } else {
				console.error('Error sending reset link:', response.statusText);
			  }
			} catch (error) {
			  console.error('Fetch error:', error);
			}
		  },
		  resetPassword: async (token, password) => {
			const url = `${apiUrl}/api/resetpassword`;
		  
			try {
			  const response = await fetch(url, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token, password }),
			  });
		  
			  if (response.ok) {
				const data = await response.json();
				console.log('Password reset successful:', data);
			  } else {
				console.error('Error resetting password:', response.statusText);
			  }
			} catch (error) {
			  console.error('Fetch error:', error);
			}
		  },
		  validateResetToken: async (token) => {
			const url = `${apiUrl}/api/validatepasswordresettoken`;
		
			try {
			  const response = await fetch(url, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			  });
		
			  if (response.ok) {
				const data = await response.json();
				console.log('Token validation successful:', data);
				return true; 
			  } else {
				console.error('Error validating reset token:', response.statusText);
				return false; 
			  }
			} catch (error) {
			  console.error('Fetch error:', error);
			  return false; 
			}
		  },



		//TOKEN FROM STORE
		tokenFromStore: () => {
				let store = getStore();
				const token = sessionStorage.getItem("token");
			    if (token && token!= null && token!=undefined) setStore({token: token});
		},

		//Edit User
		editUser: async (first_name,last_name,biography,perm_location) => {
			let opt = {
				method : "PUT",
				headers : {
					"Content-Type":"application/json",
					"Authorization": "Bearer " + sessionStorage.getItem("token")
				},
				body : JSON.stringify({
					"first_name" : first_name,
					"last_name" : last_name,
					"biography" : biography,
					"perm_location" : perm_location
				})
			}
			try {
				let response = await fetch (process.env.BACKEND_URL + "/api/edit_user", opt)
				if (response.status == 200) {
					let data = await response.json()
					setStore({ user : data.user })
					return true
				}
				else {
					return false
				}
			}
			catch (error) {
				console.log(error)
			}
		},

		//This is not part of the project
		getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;