const app = require("./index");
const connect = require("./configs/db");

app.listen(5000, () => {
    try {
        connect();
        console.log("listening on port 5000");
    } catch (err) {
        console.log(err);
    }
});