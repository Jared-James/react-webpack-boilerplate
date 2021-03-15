import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'



const ListMovies = (props) => {
    const [checkBoxInArray, addCheckBoxToArray] = useState([])
    const [reload, reloadPage] = useState(false)


    let { movies, showMovieList, loadMovieDataFromApi } = props



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

    console.log(checkBoxInArray)


    return (
        <>
           
            <div id="list-movie-container">
                {showMovieList ? movies.map(moviename => {
                    // const movie = moviename.movieName
                    const { rating, movieName } = moviename

                    return <ul key={moviename.id} id={moviename.id}>
                        <ol>
                            <div id="movies">
                                <div id="movie-checkbox">
                                    <label>
                                        <input id="no-line" onChange={handleOnChange}   type="checkbox" name={movieName} value={moviename.id} />
                                        <label id="movie-title">{movieName}</label>
                                    </label>

                                </div>
                                <div id="movie-rating">
                                        <label>Genre: {rating}</label>
                                    </div>
                            </div>
                        </ol>
                    </ul>

                }) : <p></p>}
            </div>
            <div id="movie-title-remove-button">
                <button id="remove-button" onClick={handleRemoveMovies}>Remove movies</button>
            </div>
        </>
    )
}

export default ListMovies

{/* <div id="movies">
<div id="movie-checkbox">
    <input id="no-line" onChange={handleOnChange} type="checkbox" name={movieName} value={moviename.id} />
</div>
<div id="movie-title">
    <label for="no-line">{movieName}</label>
</div>

</div> */}