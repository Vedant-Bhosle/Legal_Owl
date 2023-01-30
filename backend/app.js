require('dotenv').config()
const { urlencoded } = require('express');
const express = require('express');
const auth = require("./middleware/auth")
const cookieParser = require('cookie-parser')
const { reset } = require('nodemon');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const bcrypt = require('bcryptjs')
require('./db/conn')
const User = require('./models/registers')
const Issue=require('./models/issues')
const Case=require('./models/cases')
var cors = require('cors')
const port = process.env.PORT || 5001;

const app = express();

app.use(cors({origin : '*'}));
// app.use(cors());




app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())






app.get("/", (req, res) => {
    res.send("home page")
})


app.get("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((elem) => {
            return elem.token !== req.token;
        })


        res.clearCookie("jwt")
        // console.log("Logout Succesfully");
        await req.user.save();
        res.status(200).json("you are logged out succesfully");
    } catch (err) {
        res.status(500).json({ errormsg: "Something went wrong.Please refresh the site." })
    }

})


app.post("/login", async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        const useremail = await User.findOne({ email: email })
        // hash check
        const isMatch = await bcrypt.compare(password, useremail.password)
        // console.log(isMatch);
        const token = await useremail.generateAuthToken()
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        })


        if (isMatch) {
            req.user=useremail;
             console.log("you are logged in successfully")
            res.status(201).json({message:"you are logged in succesfully"});

        } else {
            res.status(400).message( {
                alert: "Invalid Credentials !"
            })
        }

    }
    catch (err) {
        res.status(400).json({
            alert: "Invalid Credentials !"
        })
    }
})
///secret page




app.post("/register", [
    check("firstname", 'this must be 3+ character long').exists().isLength({ min
        : 3 }),
    
    check("email", 'Enter a valid Email').exists().isEmail().normalizeEmail(),
   
    check("password", 'password is too short').exists().isLength({ min: 4 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const alerts = errors.array();
        res.status(500).json({ alerts })
    }
    else {

        try {
            const password = req.body.password;
            const cpassword = req.body.confirmpassword;
           


            if (password === cpassword) {
                const registerUser = new User({
                    firstname: req.body.firstname,
                  
                    email: req.body.email,
                    feild:req.body.feild,
                    password: req.body.password,
                    confirmpassword: req.body.confirmpassword
                })

                //create token
                const token = await registerUser.generateAuthToken()

              //we dont have to store a cookie in registeration route
                // cookie
                // res.cookie("jwt", token, {
                //     expiresIn: "1m",
                //     httpOnly: true
                // })

                // ////



                const registered = await registerUser.save();
                // console.log("user saved succesfully");
                // res.status(200);
                res.status(201).json({ message: "You Are Registered Succesfully"  })
            }
            else {
                // res.send("passwords are not matching")
                res.status(500).json({ errormsg: "Confirm password and password should be same." })

            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json( { errormsg: "Something went wrong,or likely data you will inserting is alredy present" })

        }
    }

})


app.get("/Question",auth ,(req, res) => {
    console.log("IN Question page");
    res.status(200).send(req.user);
})



// async function getLinks (description) {
    
// const url="/http://127.0.0.1:5000/"+ description;
// const res=fetch(url,  )

// }

// summary routes

app.post("/addquery",async (req,res)=>{
   
    try{
     
        const{state,city,employeestatus,description}=req.body;
        
        // const { title, description } = req.body;
        // console.log(req.user)
        // user: req.user._id,
        const issue = new Issue({  state,city,employeestatus,description})
        const savedissue = await issue.save();
        console.log("ok");


     //req to flask 
      
    //  getLinks(description);


     //we get list of links

     //search links in mongoose database

     //and sen


  
        res.status(201).json({error:"error msg"})

    }
    catch(err){

        res.status(500).json(err)

    }

})





app.post("/getsummary",async (req,res)=>{
try{
    const {linkdata}=req.body;
    //
   
   let allsummaries = [];
    for(let i=0;i<linkdata.length;i++){
        const data = await Case.findOne({ links: linkdata[i]  })
        allsummaries.push({"summary" :data.summary, "link": data.links});
    }
  
    
    // const summary=data.summary;
//  console.log(data)
  res.status(200).json({
    summary:allsummaries
  })

}catch(error){
console.log(error);
console.log("something wrong in getsummary")
res.status(500).json({error:"error in getsummary"})
}

})





//Error Route

app.listen(port, () => {
    console.log("server running on port 5001");
})