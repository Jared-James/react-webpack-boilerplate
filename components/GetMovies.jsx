import React, { useState, useEffect, useContext } from 'react'
import ListMovies from './ListMovies';
import { appContext } from './App'
const axios = require('axios');

const GetMovies = () => {
    const [showMovieList, setMovieList] = useState(false)
    const [movies, getMovies] = useState([])

    let { title } = React.useContext(appContext)


    // calls the function everytime the title changes from appContext
    // This causes a rerender and makes sure our list stays upto date with 
    // new database additions

    useEffect(() => {
        loadMovieDataFromApi()
    }, [title])


    // GET request to /users that returns the movie table from the database 
    // We set the setMovieList to true so that we re-render the component to display the updated list

    const loadMovieDataFromApi = async () => {
        try {
            let { data } = await axios.get('http://localhost:3000/users')
            getMovies(data.getMovieList)
            setMovieList(true)
        } catch (e) {
            console.log('could not fetchh data', e)
        }
    }

    // Sets showMovieList to false which hides the data from view
    const HideMovieList = () => {
        setMovieList(false)
    }

    // returns two buttons which deal with showing and hiding the movie list
    // return a ListMovies component which has the indiviual movies listed.
    return (
        <>
            <button onClick={loadMovieDataFromApi}>Show Movies</button>
            <button onClick={HideMovieList}>Hide Movies</button>
            <ListMovies loadMovieDataFromApi={loadMovieDataFromApi} movies={movies} showMovieList={showMovieList} />
        </>
    )
}

export default GetMovies