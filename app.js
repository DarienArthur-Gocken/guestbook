import express from 'express';

const app = express();

const PORT = 3003;

app.use(express.static('public'));

// form data in req.body
app.use(express.urlencoded({ extended: true }));

const orders = [];

app.get('/', (req, res) => {

    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get('/contact-us', (req,res) => {

    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

app.get('/confirm', (req,res) => {

    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin', (req,res) => {

    res.send(orders);
    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
});

app.post('/submit-order', (req,res) => {

    const order = {
        fname: req.body.firstname,
        lname: req.body.lastname,
        jobtitle: req.body.jobtitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        met: req.body.met,
        other: req.body.other,
        mailingList: req.body.mailinglist,
        emailformat: req.body.emailformat
    };

    orders.push(order);
    console.log(orders);

    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});