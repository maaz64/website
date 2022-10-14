const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
// const bodyparser = require("body-parser");
const mongoose = require('mongoose');

// Connecting to the mongoDB database using mongoose
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/maaz');
}

// Defining the schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    myText: String
});

// defining above defined schema as a model
const ContactUs = mongoose.model('formsData', contactSchema);

const port = 3000;

const home = fs.readFileSync('./index.html');
const about = fs.readFileSync('./about.html');
const services = fs.readFileSync('./services.html');
const contact = fs.readFileSync('./contact.html');
const errtemp = fs.readFileSync('./404.html');

// For serving static files in express.js...we have to put images and other files that we are using in our HTML and CSS files in static folder to show up on our websites..
app.use('/static', express.static('static'))

// For including CSS files we have to put it in the public folder...
app.use(express.static(path.join(__dirname, 'public')));


//For taking input of forms.
app.use(express.urlencoded({ extended: true }));

// We use below code to get a our forms input in a txt file
// app.post('/', (req, res) => {
//     // console.log(req.body);
//     req.body;
//     let formOutput =`Full name is:${req.body.name}. Email is:${req.body.email}. Mobile number is:${req.body.mobile}.Feedback and Suggestions are:${req.body.myText}`
//     fs.writeFileSync('form_output.txt',formOutput);
// });

app.post('/contact', (req, res) => {
    const myData = new ContactUs(req.body);     //using the ContactUs model to collect forms input data.
    myData.save().then(() => {                    //saving the forms input data.
        res.send("The item has been saved to the database")
    }).catch(() => {
        res.status(400).send("The item has not been saved to the database")
    })
});

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(home);
});

app.get('/about', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(about);
});

app.get('/services', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(services);
});

app.get('/contact', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(contact);
});

app.use((req, res, next) => {
    // res.status(404).send("Page Not Found")
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(errtemp);
})


app.listen(port, () => {
    console.log(`Your application started successfully on port ${port}`)
});



