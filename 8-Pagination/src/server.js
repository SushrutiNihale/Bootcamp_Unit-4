const app = require("./index.js");
const connect = require('./configs/db.js')

app.listen(3004, async () => {
    try {
        await connect();
    } catch (err) {
        console.log('Something went wring')
    }
    console.log('listening on port 3004');
})