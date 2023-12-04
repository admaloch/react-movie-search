# React-movie-search

<b>About this project:</b><br/> 
This is a rebuild of a movie search app I originally made with vanilla JS https://github.com/admaloch/js-movie-search. It allows you to search for movies, tv shows or both. The movie data is from OMDB API. The intent of this project was to get some practice with React, TypeScript, asynchronous Javascript and working with APIs.

<b>Technologies used:</b><br/> 
--React<br/>
--Typescript<br/>
--JavaScript<br/>
--OMDB API: https://www.omdbapi.com/<br/>

<b>Takeaways:</b><br/> 
The basis of the project had already been completed in the original app, so this was a good opportunity to focus purely on applying React concepts effectively and learning good practices for state management and component structuring. The most challenging part of this project was using hooks I wasn't comfortable with yet, such as useReducer, useRefs, portals, context api, and useMemo. I reworked multiple parts of the project to experiment with different means of state management, and reworked the component strucuture on multiple occasions. The project was a great way to dive into some of these react concepts and refine these skills. 

<b>Current status:</b><br/> 
The project is currently finished.

<b>Note:</b><br/> 
This app has a search input that runs api calls on key press, but OMDB prevents that if the request returns too many results so it only works with 3 letters or more. 
