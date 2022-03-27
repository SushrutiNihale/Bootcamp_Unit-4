const express = require("express");
const connect = require("./configs/db");
const passport = require("./configs/google-auth");
const userController = require("./controllers/user.controller")
const productController = require("./controllers/product.controller")

const {register,login,generateToken} = require("./controllers/auth.controller")
const app = express();

app.use(express.json());


app.use("/users", userController)

app.post("/register", register)

app.post("/login", login)

app.use("/products", productController)

app.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
	passport.authenticate( 'google', {
		successRedirect: '/auth/google/success',
		failureRedirect: '/login',
        session: false // no need for session since we are using tokens
    }),

    (req,res) => {
        const token = generateToken(req.user)
        return res.status(200).send({user:req.user, token})
    }
);

app.listen(5000, async () => {
    try{
        await connect();
        console.log("listening on port 5000")
    }
    catch(err){
        console.log(err.message);
    }
});