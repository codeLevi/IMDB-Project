window.onload=function(){
	happenAtLogedIn ()
	//declaring a new object for the movie details
	const currentMovie=new MovieDetails();
	//using an id parameter from code below
	const currentPostId=getUrlParameter('movieId');
	console.log(currentPostId);
	//making the promise chain
		currentMovie.fetchData(currentPostId)
		.then(createDetails)
		.catch(errorMsg);

		function createDetails(){
			console.log(currentMovie);
			//getting the container element
			const postDetailsContainer=document.getElementById('movieDetailsContainer');
			//creating the elements for display

			const divCont=document.createElement('div');
			divCont.setAttribute('id', 'divCont');


			const breakPoint=document.createElement('hr');
			breakPoint.setAttribute('id', 'divider');

			const postTitle=document.createElement('h3');
			postTitle.innerHTML=currentMovie.Title;

			const postPoster=document.createElement('img');
			postPoster.setAttribute('src',currentMovie.Poster);
			postPoster.classList.add('imgMovie');

			const postPlot=document.createElement('p');
			postPlot.innerHTML= "<span>Plot</span>:" + "&nbsp;" + currentMovie.Plot;
			
			const postActors=document.createElement('p');
			postActors.innerHTML= "<span>Actors</span>:  " + "&nbsp;" + currentMovie.Actors;
			
			const postAwards=document.createElement('p');
			postAwards.innerHTML= "<span>Awards</span>:  " + "&nbsp;" + currentMovie.Awards;

			const postRuntime=document.createElement('p');
			postRuntime.innerHTML= "<span>Runtime</span>: " + "&nbsp;" + currentMovie.Runtime;

			const postCountry=document.createElement('p');
			postCountry.innerHTML= "<span>Country</span>: " + "&nbsp;" + currentMovie.Country;

			const postProduction=document.createElement('p');
			postProduction.innerHTML= "<span>Production</span>: " + "&nbsp;" + currentMovie.Production;

			const postGenre=document.createElement('p');
			postGenre.innerHTML= "<span>Genre</span>: " + "&nbsp;" + currentMovie.Genre;

			const postLanguage=document.createElement('p');
			postLanguage.innerHTML= "<span>Language</span>: " + "&nbsp;" + currentMovie.Language;

			const postMetascore=document.createElement('p');
			postMetascore.innerHTML= "<span>Metascore</span>: " + "&nbsp;" + currentMovie.Metascore;

			const postRated=document.createElement('p');
			postRated.innerHTML= "<span>Rate</span>: " + "&nbsp;" + currentMovie.Rated;

			const postReleased=document.createElement('p');
			postReleased.innerHTML= "<span>Release Date</span>: " + "&nbsp;" + currentMovie.Released;

			const postType=document.createElement('p');
			postType.innerHTML= "<span>Genre</span>: " + "&nbsp;" + currentMovie.Type;

			const postYear=document.createElement('p');
			postYear.innerHTML= "<span>Release Date</span>: " + "&nbsp;" + currentMovie.Year;

			const postBoxOffice=document.createElement('p');
			postBoxOffice.innerHTML= "<span>BoxOffice</span>: " + "&nbsp;" + currentMovie.BoxOffice;

			const postDVD=document.createElement('p');
			postDVD.innerHTML= "<span>Dvd</span>: " + "&nbsp;" + currentMovie.DVD;

			const postimdbRating=document.createElement('p');
			postimdbRating.innerHTML= "<span>Imdb Rating</span>: " + "&nbsp;" + currentMovie.imdbRating;

			const postimdbVotes=document.createElement('p');
			postimdbVotes.innerHTML= "<span>Imdb Votes</span>: " + "&nbsp;" + currentMovie.imdbVotes;

			const postWebsite=document.createElement('a');
			postWebsite.setAttribute('href',currentMovie.Website);
			postWebsite.setAttribute('target','blank');
			postWebsite.innerHTML="<span>Movie website</span>:</a> " + "&nbsp;" + currentMovie.Website+'<br>';


			
			//attaching the created elements for display
			postDetailsContainer.appendChild(divCont);
			divCont.appendChild(postTitle);
			divCont.appendChild(postPoster);
			divCont.appendChild(postPlot);
			divCont.appendChild(postType);
			divCont.appendChild(postActors);
			divCont.appendChild(postAwards);
			divCont.appendChild(postBoxOffice);
			divCont.appendChild(postYear);
			divCont.appendChild(postRuntime);
			divCont.appendChild(postDVD);
			postDetailsContainer.appendChild(breakPoint);
			postDetailsContainer.appendChild(postCountry);
			postDetailsContainer.appendChild(postProduction);
			postDetailsContainer.appendChild(postGenre);
			postDetailsContainer.appendChild(postLanguage);
			postDetailsContainer.appendChild(postMetascore);
			postDetailsContainer.appendChild(postRated);
			postDetailsContainer.appendChild(postReleased);
			postDetailsContainer.appendChild(postimdbRating);
			postDetailsContainer.appendChild(postimdbVotes);
			postDetailsContainer.appendChild(postWebsite);


			//EDIT 

			const editButton = document.getElementById("edit-button"); 
			editButton.addEventListener("click", (e) => {
				e.preventDefault();
				const title=document.querySelector("input[name='movieName']");
				const year=document.querySelector("input[name='movieYear']");
				const type=document.querySelector("input[name='movieType']");
				const genre=document.querySelector("input[name='movieGenre']");
				const poster=document.querySelector("input[name='moviePoster']");
				title.value = currentMovie.Title;
				year.value = currentMovie.Year;
				type.value = currentMovie.Type;
				genre.value = currentMovie.Genre;
				poster.value = currentMovie.Poster;

			});

			const saveButton = document.getElementById("save-changes");
			saveButton.addEventListener("click", (e) => {
				e.preventDefault();
				const id=getUrlParameter("movieId");
				console.log(id);
				const title=document.querySelector("input[name='movieName']");
				const year=document.querySelector("input[name='movieYear']");
				const type=document.querySelector("input[name='movieType']");
				const genre=document.querySelector("input[name='movieGenre']");
				const poster=document.querySelector("input[name='moviePoster']");

				const data={
					Title:title.value,
					Year:year.value,
					Type:type.value,
					Genre:genre.value,
					Poster:poster.value
				};
				console.log(data);

				const updateMovie = new MovieDetails();
				updateMovie.editMovie(id,data); 
			});


			//complex code for aan array to display the objects from within
			let postRates="";
			const postRatings=document.createElement('div');
			for(let i=0;i<currentMovie.Ratings.length;i++){
			postRates += "<ul>"+"<li>"+currentMovie.Ratings[i].Source+":"+
				currentMovie.Ratings[i].Value+"</li>"+"</ul>";
			}
			postRatings.innerHTML=postRates;
			postDetailsContainer.appendChild(postRatings);

			//logOut
			const logoutUser=new User();
			const logoutButton=document.getElementById('logout-button');
			logoutButton.addEventListener('click',(e)=>{
				e.preventDefault();
				logoutUser.SendLogoutData()
				.then(logoutUsers)
				.catch(logoutError);
			});
		
			function logoutUsers(){
				localStorage.clear();
				happenAtLogedIn();
			}

			function logoutError(xhr){
			console.log("error",xhr);
			};

			//Log In functionality
			//Submit button
			const loginButton = document.querySelector("[name='login']");
			loginButton.addEventListener("click", (event) => {
				event.preventDefault();
				
				console.log(event.target);
				const userName = document.querySelector("[name='uname']").value;
				const password = document.querySelector("[name='psw']").value;
				const dataUser = {
					username:userName,
					password:password,
				};
				const currentUserLogin = new User(); 
				//console.log(currentUserLogin);
				currentUserLogin.sendLoginData(dataUser).then((response) => {
					console.log(response);
					let accessToken = response.accessToken;
					localStorage.setItem('loginToken', accessToken);
					happenAtLogedIn();
					$("#opener").hide();
				});
			})

			//Add Movie 
			const addMovieButton = document.querySelector("[name='addMovie']");
			//console.log(addMovieButton);
			addMovieButton.addEventListener("click", (event) => {
				//console.log(event.target);
				const title = document.querySelector("[name='titleCreate']").value;
				const year = document.querySelector("[name='yearCreate']").value;
				const type = document.querySelector("[name='typeCreate']").value;
				const genre = document.querySelector("[name='genreCreate']").value;
				const imageUrl = document.querySelector("[name='posterCreate']").value;


				const movieAddData = {
					Title:title,
					Year:year,
					Genre:genre,
					Type:type,
					Poster:imageUrl,
				}

				const movieAdded = new Movie();
				movieAdded.addMovie(movieAddData);
			})
			
			//register new user
			const registerBtn = document.getElementById('signupbtn');
			//console.log(registerBtn);
			registerBtn.addEventListener("click", (event) => {
				event.preventDefault();
				const usernameRegister = document.querySelector('[name="username"]').value;	
				const passwordRegister = document.querySelector('[name="pswR"]').value;
				const dataRegister = {
					username:usernameRegister,
					password:passwordRegister,
				};
				const userRegister = new User();
				userRegister.registerData(dataRegister);
			})			
		}		
	}

	function errorMsg(xhr){
		console.log('Something happened:',xhr);
	}

	/*** It retrieves a query (URL) parameter value** 
	It expects you to send the parameter key(before '=')* **/
	function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	const results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	};
