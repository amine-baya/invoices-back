const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents');

const app = express();

const port = process.env.PORT || 5001;

app.use(cors({
    origin: 'https://invoices-front.onrender.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/create-pdf', (req, res) => {
    console.log(req.body,'helloooooooooooooooooo');
    const timestamp = new Date().getTime();
    const originalFile = `${__dirname}/result.pdf`;
    const newFile = `${__dirname}/result-${timestamp}.pdf`;

    // Delete existing result.pdf file
    try {
        fs.unlinkSync(originalFile);
    } catch (err) {
        // Ignore error if file doesn't exist
    }

    pdf.create(pdfTemplate(req.body), {}).toFile(`result-${timestamp}.pdf`, (err) => {
        

        fs.copyFileSync(originalFile, newFile);
        if(err) {
           return res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});



app.get('/fetch-pdf', (req, res) => {
    const files = fs.readdirSync(__dirname).filter(file => file.startsWith('result-'));
    console.log(files,'h1111111111111');
    const latestFile = files.sort().reverse()[0];
    console.log(latestFile,'h2222222222222');


    if (!latestFile) {
        return res.status(404).send('PDF file not found');
    }

    // set cache-control header to prevent caching of the PDF file
    res.set('Cache-Control', 'max-age=0');

    res.sendFile(`${__dirname}/${latestFile}`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));