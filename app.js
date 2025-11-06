import express from 'express';

const app = express();

const PORT = 3003;

app.set('view engine', 'ejs');

app.use(express.static('public'));

// form data in req.body
app.use(express.urlencoded({ extended: true }));

const contacts = [];

app.get('/', (req, res) => {
    res.render('resume');
});

app.get('/contact', (req,res) => {
    res.render('contact');
});

app.get('/admin', (req,res) => {
    res.render('admin', {contacts});
});

app.post('/submit-order', (req,res) => {

    const contact = {
        fname: req.body.firstname,
        lname: req.body.lastname,
        jobtitle: req.body.jobtitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        met: req.body.met,
        other: req.body.other,
        mailingList: req.body.mailinglist,
        emailFormat: req.body.emailformat,
        dateTime: new Date().toLocaleString()
    };

    contacts.push(contact);
    console.log(contacts);

    res.render('confirmation', {contact});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});