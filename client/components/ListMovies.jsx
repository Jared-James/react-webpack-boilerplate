import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'



const ListMovies = (props) => {
    const [checkBoxInArray, addCheckBoxToArray] = useState([])
    const [reload, reloadPage] = useState(false)


    let { movies, showMovieList, loadMovieDataFromApi } = props
    console.log('props', movies)

    // on reload this will check that checkboxes are in the array
    useEffect(() => {
        loadMovieDataFromApi()
        console.log(checkBoxInArray)
    }, [reload])


    // Checks if the checkbox checked prop is === true then adds the id to an array
    // if the checkbox prop is !=== then it will find the indexOf the id and remove it from the array 
    const handleOnChange = (e) => {
        if (e.target.checked === true) {
            addCheckBoxToArray([e.target.value, ...checkBoxInArray])
        } else {
            const index = checkBoxInArray.indexOf(e.target.value)
            if (index > -1) {
                checkBoxInArray.splice(index, 1)
            }
        }
    }


    // Sends a post request to /removeMovie along with the ID 
    // if  status is 201 then reload the page using custom hook
    // reset the checkBoxInArray back to an empty array to remove previous value
    const handleRemoveMovies = async (e) => {
        e.preventDefault()
        try {
            const payLoad = {
                id: checkBoxInArray
            }
            let data = await axios.post('http://localhost:3000/removeMovie', { payLoad })
            if (data.status === 201) {
                reloadPage(!reload)
                addCheckBoxToArray([])
            } else {
                return
            }
        } catch (e) {
            console.log('error in sending', e)
        }
    }

    return (
        <>
            <div id="movie-title-remove-button">
                <h2 id="movie-title">Movie Collection</h2>
                <button id="remove-button" onClick={handleRemoveMovies}>Remove movies</button>
            </div>
            <div id="list-movie-container">
                {showMovieList ? movies.map(moviename => {
                    // const movie = moviename.movieName
                    const { rating, movieName } = moviename

                    return <ul key={moviename.id} id={moviename.id}>
                        <ol>
                            <div id="movies">
                                <div id="movie-checkbox">
                                    <input onChange={handleOnChange} type="checkbox" name={movieName} value={moviename.id} />
                                </div>
                                <div id="movie-title">
                                    <label>{movieName}</label>
                                </div>
                                <div id="movie-rating">
                                    <label>rating: {rating}</label>
                                </div>
                            </div>
                        </ol>
                    </ul>

                }) : <p></p>}
            </div>
        </>
    )
}

export default ListMovies