const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const postroutes = require('./routes/posts');
const categoryroutes = require('./routes/category');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyparser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/blogs')
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log('db eror', err));


app.use('/api/posts', postroutes);
app.use('/api/categories', categoryroutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`))