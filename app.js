import express from 'express';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';

dotenv.config();

const app = express();

const PORT = 3003;

app.set('view engine', 'ejs');

app.use(express.static('public'));

// form data in req.body
app.use(express.urlencoded({ extended: true }));

const contacts = [];

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

app.get('/', (req, res) => {
    res.render('resume');
});

app.get('/contact', (req,res) => {
    res.render('contact');
});

app.get('/admin', async (req,res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contacts ORDER BY dateTime DESC');
        return res.render('admin', {contacts: rows});
    } catch (err) {
        console.error('DB read error:', err);
    }   

    res.render('admin', {contacts});
});

app.post('/submit-order', async (req,res) => {
    const contact = {
        fname: req.body.firstname,
        lname: req.body.lastname,
        jobtitle: req.body.jobtitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        met: req.body.met,
        other: req.body.other,
        message: req.body.message,
        mailingList: req.body.mailinglist,
        emailFormat: req.body.emailformat,
        dateTime: new Date().toLocaleString()
    };

    try {
        const sql = `INSERT INTO contacts (fname, lname, jobtitle, company, linkedin, email, met, other, message, mailingList, emailFormat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const nullfunction = (v) => (v === undefined ? null : v);
        const params = [contact.fname, contact.lname, contact.jobtitle, contact.company, contact.linkedin, contact.email, contact.met, contact.other, contact.message, contact.mailingList, contact.emailFormat].map(nullfunction);
        await pool.execute(sql, params);
    } catch(err){
        console.log('Database Error', err);
    }

    res.render('confirmation', {contact});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});