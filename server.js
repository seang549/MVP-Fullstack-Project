const express = require('express');
const { Pool } = require('pg');
const dbString = process.env.DATABASE_URL
const pool = new Pool({
    connectionString: dbString,
})

const app = express();
app.use(express.json());
app.use(express.static('public'));

let dotenv = require('dotenv')
dotenv.config()



const getAll = app.get('/movies_to_watch', async(req, res) => {
        try {
            const result = await pool.query('SELECT * FROM movies_to_watch')
            res.status(200).json(result.rows)
        }
        catch(err) {
            console.error(err.message)
        }
    })

const getOne = app.get('/movies_to_watch/:id', async(req, res) => {
        try {
            let {id} = req.params;
            let result = await pool.query('SELECT * FROM movies_to_watch WHERE id = $1', [id])
            if (result.rowCount === 0) {
                res.type("text/plain").send('Movie not found')
            }
            res.status(200).json(result.rows[0])
        }
        catch(err) {
            console.error(err.messgage)
        }
    })

const createOne = app.post('/movies_to_watch', async(req,res) =>{
        try {
            let {title, director, release_year, genre, rating} = req.body;
            let result = await pool.query('INSERT INTO movies_to_watch (title, director, release_year, genre, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, director, release_year, genre, rating]);
            res.status(201).json(result.rows[0])
        }
        catch (err) {
            console.error(err.message)
        }
    })

const updateOne = app.put('/movies_to_watch/:id', async (req, res) => {
        try {
            let {title, director, release_year, genre, rating} = req.body;
            let {id} = req.params;
            let currentMovie = await pool.query('SELECT * FROM movies_to_watch WHERE id = $1', [id]);
            if (currentMovie.rowCount === 0) {
                res.type('text/plain').send('Movie not found')
            };
            let movie = currentMovie.rows[0]

            let updatedMovie = {
                title: title || movie.title,
                director: director || movie.director,
                release_year: release_year || movie.release_year,
                genre: genre || movie.genre,
                rating: rating || movie.rating
            }
            await pool.query('UPDATE movies_to_watch SET title = $1, director = $2, release_year = $3, genre = $4, rating = $5 WHERE id = $6', [updatedMovie.title, updatedMovie.director, updatedMovie.release_year, updatedMovie.genre, updatedMovie.rating, id])
            res.status(201).json(updatedMovie)
        }
        catch(err) {
            console.error(err.message)
        }
    })

const deleteOne = app.delete('/movies_to_watch/:id', async (req,res) => {
        try {
            let {id} = req.params
            let result = await pool.query('DELETE FROM movies_to_watch WHERE id = $1 RETURNING *', [id])
            console.log(result.rows[0])
            res.status(200).json(result.rows[0])
        }
        catch (err) {
            console.error(err.message)
        }
    })






app.listen(process.env.PORT, () => {
    console.log(`WORKING ON... ${process.env.PORT}`)
} )

module.exports = {
    getOne,
    getAll,
    createOne,
    updateOne,
    deleteOne
}