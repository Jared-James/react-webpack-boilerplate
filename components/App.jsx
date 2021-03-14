import React, { createContext, useState } from 'react'
import AddMovies from './AddMovies'
import GetMovies from './GetMovies'


export const appContext = React.createContext()

const App = () => {

const [title, setTitle] = useState('')

  return (
    <>
      <appContext.Provider value={{title, setTitle}}>
      <AddMovies />
        <GetMovies />
      </appContext.Provider>
    </>
  )
}

export default App