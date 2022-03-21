const app = require("./index");
const connect = require("./configs/db");

app.listen(5000, async(req,res) => {
    try {
        await connect();
        console.log("listening on port 5000 for C3");
    } catch(err) {
        console.log(err);
    }
});