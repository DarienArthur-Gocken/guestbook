import express from 'express';

const app = express();

const PORT = 3003;

app.use(express.static('public'));

app.get('/', (req, res) => {

    res.sendFile(`${import.meta.dirname}/public/home.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});