import React, { useState, useEffect } from 'react'
import ListMovies from './ListMovies';
const axios = require('axios');

const GetMovies = () => {
    const [showMovieList, setMovieList] = useState(false)
    const [listMovies, getMovies] = useState([])

    const getData = async () => {
        try {
            let { data } = await axios.get('http://localhost:3000/users')
            console.log('data', data)
            getMovies(data.getMovieList)
            setMovieList(true)
        } catch (e) {
            console.log('could not fetchh data', e)
        }
    }

    const HideMovieList = () => {
        setMovieList(false)
    }

    return (
        <>
            <button onClick={getData}>Load Movies!</button>
            <button onClick={HideMovieList}>Hide Movies</button>
            <ListMovies listMovies={listMovies} hideMovies={showMovieList} />
        </>
    )
}

export default GetMovies