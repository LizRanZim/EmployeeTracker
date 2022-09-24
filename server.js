// Import and requrie express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import and require console.table
const cTable = require('console.table');
// Import and require inquirer
// const inquirer = require('inquirer');

// if query reference is required form another folder use below
// const runQuery = require('./helpers/')


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '2Wins2!!',
        database: 'humans_db'
    },
    console.log(`Connected to the humans_db database.`)
);

// Create a movie

// app.post('/api/add-movie', (req, res) => {
//     console.log(req.body);
//     db.query(`INSERT INTO movies (movie_name) VALUES (?)`, [req.body.movie_name], function (err, results) {
//         if (err || !(req.body.movie_name)) {
//             console.error(err);
//             res.status(500).json(err);
//         } else {
//             console.log(req.body.movie_name);
//             res.json(req.body.movie_name);
//         }
//     });
// });

// Read all movies

// app.get('/api/movies', (req, res) => {
//     db.query('SELECT id, movie_name AS title FROM movies', function (err, results) {
//         console.log(results);
//         res.json(results);
//     });
// });

// Delete a movie

// app.delete('/api/movie/:id', (req, res) => {
//     db.query('DELETE FROM movies WHERE id = ?', req.params.id, function (err, results) {
//         console.log(results);
//         res.json(results);
//     });
// });

// Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//     db.query('SELECT reviews.review, movies.movie_name AS title FROM movies JOIN reviews ON movies.id = reviews.movie_id', function (err, results) {
//         console.log(results);
//         res.json(results);
//     });
// });


// BONUS: Update review name

// app.put('/api/review/:id', (req, res) => {
//     db.query('UPDATE reviews SET review = ? WHERE id = ?', [req.body.review, req.params.id], function (err, results) {
//         console.log(results);
//         res.json(results);
//     });
// });


// Default response for any other request (Not Found)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});