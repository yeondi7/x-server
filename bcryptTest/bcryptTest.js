const bcrypt = require('bcrypt');
const password = '12345678';
const saltRound = 10;

let hashed = bcrypt.hashSync(password, saltRound);
console.log(`password: ${password}, hashed:${hashed}`);
const result = bcrypt.compareSync('1234', hashed);
console.log(`Password is Same: ${result}`);
const result1 = bcrypt.compareSync('dfsaf', hashed);
console.log(`Password is Same: ${result1}`);

(async () => {
    const hashed = await bcrypt.hash(password, saltRound);
    console.log(`password: ${password}, hashed:${hashed}`);
    const result = await bcrypt.compare(password, hashed);
    console.log(`Password is Same: ${result}`);
    })();

    const asyncFunc = async () => {
        let hashed = await bcrypt.hash(password, saltRound);
        console.log(`password: ${password}, hashed:${hashed}`);
        const result = await bcrypt.compare(password, hashed);
        console.log(`Password is Same: ${result}`);
    };

    asyncFunc();