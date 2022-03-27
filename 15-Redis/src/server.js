const app = require("./index");
const connect = require("./configs/db")

app.listen(5000, async() => {
    try{
        await connect();
        console.log("listening on 5000 for redis");
    } catch(err) {
        console.log("error in connecting:",err);
    }
    
});