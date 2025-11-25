// import the express module
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import { validateForm } from './validation.js';

// load the variables from the .env file
dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// create an instance of an Express application
const app = express();

// set EJS as our view engine
app.set('view engine', 'ejs');

// Enable static file serving (client side file that does not communicate with database)
app.use(express.static('public'));

// allow the app to parse from data (req.body)
app.use(express.urlencoded({ extended: true }));

// treat an array to store orders
const orders = [];

// define the port number where our server will listen
const PORT = 3000;

// define a route to test database connection
app.get('/db_test', async(req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders');
        res.send(orders);
    } catch (err) {
        console.error('Database error:', err);
    }
});

// define a default "route" ('/') <- root dir
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    // send "Hello, World!" as a response to the client
    res.render('home');
});


// define an "submit-order" route
app.get('/contact-us', (req, res) => {
    res.render('contact');
})
// define an "submit-order" route
app.get('/confirmation', (req, res) => {
    res.render('confirmation');
})
// define an "submit-order" route
app.get('/admin', async(req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');

        res.render('admin', { orders });
    } catch (err) {
        console.error('Database error:', err);
    }


    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
})


// define an "submit-order" route
app.post('/submit-order', async(req, res) => {

    try {
        // create a JSON object to store the data
        const order = req.body;

        // server-side validation
        const valid = validateForm(order);
        if (!valid.isValid) {
            res.render('home', {errors: valid.errors});
        }

        // convert the toppings array into a comma-seperated string
        order.toppings = Array.isArray(order.toppings) ? order.toppings.join(", ") : "";
        // add a timstamp
        order.timestamp = new Date();

        const sql = 'INSERT INTO orders (fname, lname, email, size, method, toppings, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const params = [
            order.fname,
            order.lname,
            order.email,
            order.size,
            order.method,
            order.toppings,
            order.timestamp
        ];
        const [result] = await pool.execute(sql, params);
        // send user to confirmation page
        res.render('confirmation', {order});
    } catch (err) {
        console.error('Error inserting order: ', err);
    }
})

// start the server and make it listen on the port specified above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});