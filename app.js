// import the express module
import express from 'express';

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
app.get('/admin-page', (req, res) => {
    res.send(orders);
    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
})


// define an "submit-order" route
app.post('/submit-order', (req, res) => {
    //console.log(req.body);
    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`);

    // create a JSON object to store the data
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.fname.email,
        method: req.body.method,
        toppings: req.body.toppings,
        size: req.body.size,
        comment: req.body.comment,
        timestamp: new Date()
    };

    orders.push(order);
    console.log(orders);

    // send user to confirmation page
    res.render('confirmation', {order});
})

// start the server and make it listen on the port specified above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});