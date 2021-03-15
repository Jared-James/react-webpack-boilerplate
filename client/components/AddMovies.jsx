import axios from 'axios'
import React, { useState, useContext, useEffect, createContext } from 'react'
import { appContext } from './App'
import { v4 as uuidv4 } from 'uuid'

const AddMovies = () => {
    let [title, setTitle] = useState([])
    let [rating, setRating] = useState()
    let [duplicateMovieError, setDuplicateMovieError] = useState(false)

    let result = React.useContext(appContext)


    const handleSubmit = async (e) => {

        try {
            e.preventDefault()
            const data = {
                id: uuidv4(),
                movieName: title,
                rating: rating
            }
            let movieData = await axios.post('http://localhost:3000/newmovie', { data })
            setDuplicateMovieError(false)
            result.setTitle(title)
            return movieData


        } catch (e) {
            setDuplicateMovieError(true)
            console.log(`Duplicate Movie Title: ${e}`)
        }
    }

    const handleChangleMovieName = (e) => {
        setTitle(e.target.value)
    }

    const handleChangleRating = (e) => {
        setRating(e.target.value)
    }


    return (
        <>
            <h3>{duplicateMovieError ? <p>This movie already exists</p> : ''}</h3>

            <form onSubmit={handleSubmit}>
                <div id="add-movie-form">
                    <div id="row">
                        <label>Title:</label>
                        <input id="moviename" name="moviename" type="text" onChange={handleChangleMovieName} />
                    </div>
                    <div id="row">
                        <label>Rating:</label>
                        <input id="rating" name="rating" type="number" onChange={handleChangleRating} />
                    </div>
                    <div id="add-movie-button">
                        <button>Add Movie</button>
                    </div>


                </div>
            </form>

        </>
    )
}

export default AddMovies