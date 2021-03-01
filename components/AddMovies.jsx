import axios from 'axios'
import React, { useState } from 'react'

const AddMovies = () => {
    const [title, setTitle] = useState([])
    const [rating, setRating] = useState()
    const [duplicateMovieError, setDuplicateMovieError] = useState(false)
    
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const data = {
                movieName: title,
                rating: rating
            }
        let movieData =  await axios.post('http://localhost:3000/newmovie', {data})
        setDuplicateMovieError(false)
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
                <label>Title</label>
                <input id="moviename" name="moviename" type="text" onChange={handleChangleMovieName} />
                <label>Rating</label>
                <input id="rating" name="rating" text="number" onChange={handleChangleRating} />
                <button>Add Movie</button>
            </form>
        </>
    )
}

export default AddMovies