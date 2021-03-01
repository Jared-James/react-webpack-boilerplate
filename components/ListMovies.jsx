import axios from 'axios'
import React, { useState, useEffect } from 'react'

const ListMovies = (props) => {

    const [CheckBox, setBoxState] = useState()
    const [allCheckedBoxses, removeAllCheckedBoxses] = useState([])


    let { listMovies, hideMovies } = props

    useEffect(() => {
        console.log('checkedboxes', allCheckedBoxses)
    }, [allCheckedBoxses])


    const handleOnChange = (e) => {
        setBoxState(!!CheckBox)
        removeAllCheckedBoxses([e.target.value, ...allCheckedBoxses])

    }



    const handleRemoveMovies = async (e) => {
        e.preventDefault()
         try {
            const data = {
                id: allCheckedBoxses
            }
            let removeMovie = await axios.post('http://localhost:3000/removeMovie', {data})
            return removeMovie
         } catch (e) {
            console.log('error in sending', e)
         }
    }

    return (
        <>
            <button onClick={handleRemoveMovies}>Remove movies</button>
            <h2>Movie Collection</h2>
            {hideMovies ? listMovies.map(moviename => {
                const movie = moviename.movieName
                return <ul id={moviename.id}>
                    <ol>
                        <div onChange={handleOnChange}>
                            <p><input type="checkbox" value={moviename.id} />   {moviename.id} Title: {movie}</p>
                        </div>
                    </ol>
                </ul>
            }) : <p></p>}
        </>
    )
}

export default ListMovies