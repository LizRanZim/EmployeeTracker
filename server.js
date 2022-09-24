// Import and requrie express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import and require console.table
const cTable = require('console.table');
// Import and require sequalizer
const sequelize = require('./config/connection');
// Import and require inquirer
const inquirer = require('inquirer');



// if query reference is required form another folder use below
// const runQuery = require('./helpers/')

const app = express();
const PORT = process.env.PORT || 3001;


// // Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Connect to the database before starting the Express.js server *** when I enable sequalize it ends inquirer before I can answer questions
// sequelize.sync().then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//   });
  
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

app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
});

function showMenu() {

    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add an employee', 'Update an employee role', 'View all roles', 'Add a role', 'View all departments', 'Add a department', 'Quit'],
            name: 'menuChoice',

        },

    ])


        .then((response) => {
           console.log(response.menuChoice);
           return
           
        })



}


showMenu();

// DB Query examples:
// querying the database for the count of ids of favorite in stock books
// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//     console.log(results);
//   });
  
//   // querying the db to sum the quantity with a column named total_in_section, return maximum value and average quantity, and group by the section numbers (there are 5 sections based on seeds.sql)
//   db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//     console.log(results);
//   });
  
  // checks for 404 error
//   app.use((req, res) => {
//     res.status(404).end();
//   });
  

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

