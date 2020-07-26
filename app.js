const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js');
const blogRoute = require('./controllers/Blog.js');
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogRoute);

const endpointErr = (req, res) => {
    res.status(404).json({"error": "can not find the specified URL"});
}

app.use(endpointErr);

module.exports = app;
