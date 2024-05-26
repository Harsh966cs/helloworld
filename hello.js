const express = require('express');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const app = express()
//const uuid = require('uuid')
dotenv.config()
const port = process.env.PORT || 3000




function random(min,max)
{
    min = Math.ceil(min)
    max=Math.floor(max)
    return Math.floor(Math.random()*(max-min +1)+min);
}

app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.post("/user/generateToken",(req,res)=>{
    let jwtSecretKey = process.env.JWT_SECRATE_KEY;
    let data = {
        time: Math.floor(Date()/1000),
        userId: random(1,100),
    }

    const token = jwt.sign(data,jwtSecretKey);
    res.send(token);
 })



 app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
 
    let tokenHeaderKey = req.headers.jwt_secrate_key;
   
    let jwtSecretKey = process.env.JWT_SECRATE_KEY;
  
   console.log(jwtSecretKey)
    try {
        const token = tokenHeaderKey;
 
        const verified = jwt.verify(token, jwtSecretKey);
     
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});




app.listen(port,()=>{
    console.log(`Example  app listening on port ${port}`)
})
