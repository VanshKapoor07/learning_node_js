const express = require('express');
const mysql = require('mysql2');
const app = express();

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hudaiyur@1',
    database: 'testdb'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Express Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Routes (API START)
app.get('/', (req, res) => {        //frontend gets data
    connection.query('SELECT * FROM users', (err, rows) => {
        //if (err) throw err;
        res.render('index', { users: rows });    //load the html page
    });
});

app.post('/addUser', (req, res) => {
    const { name, email } = req.body;

    // Check if both name and email are provided
    if (!name || !email) {
        return res.status(400).send('Name and email are required');
    }

    // Insert the new user into the database
    connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error inserting user');
        }

        console.log('User added successfully');
        res.redirect('/');
    });
});


//app.post frontend gives data
//app.update
//app.delete
// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));
