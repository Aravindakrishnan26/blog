const express = require('express');
const router = express.Router();
const category = require('../model/category');
const Post = require('../model/post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        author: req.body.author,
        image: req.body.image,
    });

    try {
        const newpost = await post.save();
        res.status(201).json(newpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.category = req.body.category || post.category;
        post.author = req.body.author || post.author;
        post.image = req.body.image || post.image;
        post.updatedAt = Date.now();

        const updatedpost = await post.save();
        res.json(updatedpost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        await Post.deleteOne({ _id: post._id });
        res.json({ message: "post deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/category/:categoryid', async (req, res) => {
    try {
        const categoryid = req.params.categoryid;
        const categoryexists = await category.findById(categoryid);
        if (!categoryexists) {
            return res.status(400).json({ message: "invalid" });
        }

        const posts = await Post.find({ category: categoryid }).populate('category');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
