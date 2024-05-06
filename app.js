// const sync = require('./models/sync')      //=>돌리고 나면 가입부터 다시..
// sync();
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
// const { authPlugins } = require('mysql2');
dotenv.config();
const port = process.env.PORT || 3000;
const app = express('express');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const checkAuth = require('./routes/authorization');


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/posts', checkAuth);
app.use('/posts', postRouter);
app.use('/member', authRouter);

app.listen(port);
