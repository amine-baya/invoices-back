const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const fs = require('fs');
const path = require('path');

const pdfDirectory = path.join(__dirname, 'pdfs');

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
    console.log(req.body,'hellooooooooooo');
    pdf.create(pdfTemplate(req.body), {}).toFile(path.join(pdfDirectory, `${req.body.clientData.name}.pdf`), (err) => {
        if(err) {
           return res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(path.join(pdfDirectory, `${req.body.clientData.name}.pdf`))
})

app.listen(port, () => console.log(`Listening on port ${port}`));