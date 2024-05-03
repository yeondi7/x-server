const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || '34134erwef';
const token = jwt.sign(
    {
        id: "yeon.code", 
        rol:true,
    }, 
    secret,
     { expiresIn: 60 * 60 * 24 * 3 }
    );

    console.log(token);

    jwt.verify(token, secret, (error, decoded) => {
        console.log(decoded);
    });