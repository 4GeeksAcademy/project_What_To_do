const apiUrl = process.env.BACKEND_URL;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
				token: null,
				user: [],
				users: [],
				loggedInAs: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

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
					const data = await resp.json();
					console.log(data[0])
					sessionStorage.setItem('token', data[1])

					setStore({ users: data[0] })
					setStore({ token: data[1] })
					
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
					const store = getStore();
					console.log(store.token);
					const url = apiUrl+"/api/private"
					fetch(url, {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + store.token
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
						return resp.json();
					})
					.then(data => {
						setStore({user: data});
						console.log(data);
						
					})
					.catch(error => {
						//error handling
						console.log(error);
					})
				},


		//TOKEN FROM STORE
		tokenFromStore: () => {
				let store = getStore();
				const token = sessionStorage.getItem("token");
			    if (token && token!= null && token!=undefined) setStore({token: token});
		},

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
