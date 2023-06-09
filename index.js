const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const pdfTemplate = require('./documents');
const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
    origin: 'https://x75vrb-5173.csb.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
           return res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})
app.listen(port, () => console.log(`Listening on port ${port}`));