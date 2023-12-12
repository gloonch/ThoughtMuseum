const express = require('express');
const Post = require('./model/Thought.js');
const User = require('./model/User.js');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors')
const mongoose = require("mongoose");



const app = express();
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

mongoose.connect('mongodb://localhost:27017/thoughtmuseum')
    .then(success => {
        console.log("MongoDB connected...")
    })


app.get('/', async (req, res) => {
    res.status(200).json('test')
});


app.post('/user', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const createdUser = await User.create({
            name,
            email,
        });
        res.json(createdUser)
    } catch (e) {
        res.status(422).json(e);
    }

});

app.get('/user/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await User.findById(id))
});

app.put('/user/:id', async (req, res) => {
    const {id} = req.params;
    const {background, name} = req.body;

    try {

        const userDoc = await User.findById(id);
        userDoc.set({background: background, name: name});
        await userDoc.save();

        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e);
    }

});



app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo_' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
})

const photosMiddleware = multer({dest: 'uploads/'})
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''))
    }
    res.json(uploadedFiles);
});

app.post('/thought', async (req, res) => {
    const {
        user, title, color, description, photos, tags
    } = req.body;

    if (user && title && description) {
        const postDoc = await Post.create({
            user: user, title, color, photos, description, tags
        });
        res.status(201).json({ _id: postDoc._id});
    }
})

app.get('/thought/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Post.findById(id));
});

app.get('/thought', async (req, res) => {
    res.json(await Post.find())
});


app.listen(4000);