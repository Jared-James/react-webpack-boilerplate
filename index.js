const express = require('express')
const app = express()
const PORT = 3000
let bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = require('./data/db')

app.get("/users", async (req, res) => {
    console.log('hello from users')
    const getMovieList = await db("movie")
    res.json({ getMovieList })
})

app.post('/newmovie', async (req, res) => {
    console.log('hello from new movie')
    const formData = req.body.data
    try {
        const duplicateNameCheck = await (await db('movie').select('movieName'))
            .some(whereMovieName => whereMovieName.movieName === formData.movieName)

        if (!duplicateNameCheck) {
            const insertedMovieName = await db('movie').insert(formData)
            res.status(201).json(insertedMovieName)
        } else {
            console.log('movie already existss')
            res.status(409).send({ message: 'Movie already exists!' })
        }

    } catch (err) {
        res.status(500).json({ messge: 'Error creating new post', error: err })
    }
})

app.post('/removeMovie', async (req, res) => {
try {
    const removeMovieButtonData = req.body.payLoad.id
    const myarr = []
    myarr.push(removeMovieButtonData)
    const checkedRemove = await (await db('movie').delete().whereIn('id', myarr[0]))
    res.status(201).json(checkedRemove)
} catch (e) {
    res.status(500).json({ messge: 'Error del', error: err })
}

})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

