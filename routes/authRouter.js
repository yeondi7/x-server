const express = require('express');
const { User } = require('../models/index'); // index(=기본갑)는 생략가능
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const createHash = async (password, saltRound) => {
    let hashed = await bcrypt.hash(password, saltRound)
    console.log(hashed)
    return hashed;
}



router.post('/sign-up', async (req, res)=>{
    const member = req.body;
    member.password = await createHash(member.password, 10);
    // member.password = newPassword;
    try{
        const result = await User.create(member);
        res.json({success:true, member:result, message:'멤버 추가 성공'});
    } catch(err){
        res.json({success:false, member:[], message: err.message});
    }
});

router.post('/sign-in', async (req, res)=>{
    const {userID, password} = req.body
    const options = {
        attributes:['password'], //컬럼을 받는것
        where: {userID:userID} // {db의컬럼:전달되어온req.body}
    }
    const result = await User.findAll(options);
    // password, result.password
    if(result){
        const compared = await bcrypt.compare(password, result.password);
        if(compared) {
            const token = jwt.sign({uid:userID, rol: 'admin'}, secret)
            res.json({success:true, token:token, message:"로그인에 성공했습니다."});
        } else {
            res.json({success:false, message:"비밀번호가 맞지 않습니다."});
        }
    } else {
        res.json({success:false, message:"존재하지 않는 아이디 입니다."});
    }
});

module.exports = router;