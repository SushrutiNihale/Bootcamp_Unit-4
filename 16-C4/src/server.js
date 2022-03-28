const app = require("./index");
const connect = require("./configs/db");

app.listen(5000, async() => {
    try {
        await connect();
        console.log("Listening on port 5000 for C4");
    } catch(err) {
        console.log(err);
    }
});