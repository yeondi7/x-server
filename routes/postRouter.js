const express = require('express');
const { User, Post } = require('../models/index'); // index(=기본갑)는 생략가능
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


router.post('/', async (req, res)=>{
    const newPost = req.body;
    newPost.userID = req.userID;
    try{
        const result = await Post.create(newPost);
        res.json({success:true, documents:[result], message:"post 등록 성공"});
    } catch (err) {
        res.json({success:false, documents:[], message: err });
    }
    
});

router.get('/', async (req, res)=>{
    const result = await Post.findAll();
        res.json({success: true, documents: result, message:"post 등록 성공"});
    
});

router.get('/:uid', async (req, res) => {
    const userID = req.params.userID
    const options = {
        where: {
            userID: userID,
        },
    };

    const result = await Post.findAll(options);
    res.json({ success: true, documents: result, message: 'post 조회성공'});
});

module.exports = router;
