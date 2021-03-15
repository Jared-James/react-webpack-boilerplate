import React, { createContext, useState } from 'react'
import AddMovies from './AddMovies'
import GetMovies from './GetMovies'
import '../../styles/styles.scss'
import Header from './Header'


export const appContext = React.createContext()

const App = () => {

  const [title, setTitle] = useState('')

  return (
    <>
      <appContext.Provider value={{ title, setTitle }}>
        <div id="grid-container">
          <div id="header">
            <Header />
          </div>
          <div id="add-movies">
            <AddMovies />
          </div>
          <div id="get-movies">
            <GetMovies />
          </div>
        </div>
      </appContext.Provider>
    </>
  )
}

export default App