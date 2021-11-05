const express = require('express')
const router = express.Router();

// UserSchema
const User = require('../Schema/user')

// Database 
require('./../db/Database.js');

// Hashing 
const bcrypt = require('bcryptjs')

router.get('/', (req,res) => {
    res.send("Hellowww")
})

// Mongoose
const mongoose = require('mongoose')

// For File Stream 
const Grid = require('gridfs-stream')

// Authenticate
const Authenticate = require('../middlewares/authenticate')

// Upload Middleware
const upload = require('../middlewares/upload.js')
const uploadImage = require('../middlewares/uploadImage.js')


// Login Route
router.post('/Signin', async (req,res) => {
    console.log(req.body)

    const { Username , password } = req.body

    // Finding Unfilled Data
    try {
        if (!Username) {
            return res.status(422).json({ error : "Please enter your Username"})
        }
         else if (!password) {
            return res.status(422).json({ error : " Please enter your password"})
        }

        // Find the User
        const userLogin = await User.findOne({ Username : Username})

        console.log(userLogin)

        // Checking Hashed Password
        if (userLogin) {

            // Checking if the hashed password and entered password are same
            const isMatch = await bcrypt.compare(password, userLogin.password)

            // Generating token 
            const token = await userLogin.generateAuthToken()
            
            // Adding token to the cookies for auto signup
            res.cookie("jwtoken", token, {
                expires : new Date(Date.now() + 25892000000),
                httpOnly : true
            })

            if (isMatch) {
                res.status(201).json({ message : "Login Successful"})
            } 
            else {
                res.status(401).json({ error : "Incorrect Username or Password"})
            }
        } 
        else {
            res.status(401).json({ error : "Incorrect Username or Password"})
        }
    } 
    catch (err) {
        console.log(err)
    }
})


// Register Route
router.post('/SignUp', async (req,res) => {

    console.log(req.body)
    
    const { Username , phone , password , c_password} = req.body

    // Finding Unfilled Data
    if (!Username || !phone || !password || !c_password) {
        return res.status(422).json({ error : "Please Fill All the fields properly"})
    }

    try {
        
        // Finding Duplicate Data
        let userExists = await User.findOne({Username : Username})

        // Checking if User Exists in Database
        if (userExists){
            return res.status(422).json({ error : "User Already Exists in the Database"})
        }
        else if (password != c_password) {
            return res.status(422).json({ error : "Password and Confirm Password Do Not match"})
        }
        else {

            let user = new User({Username : Username, phone : phone, password : password})
            
            // Registering User into the Database
            const userRegister = await user.save();

            if (userRegister) {
                res.status(201).json({ message : "User Register Successfully"})
            } 
            else {
                res.status(500).json({ message : "Unable To Register User"})
            }
        }
        
    } catch (err) {
        console.log(err);
    }
})


// Logout Route
router.get('/Signout', async (req, res) => {
    res.clearCookie("jwtoken")
    res.status(200).send({ message : "Logout Successful"})
})

// Get Data
router.get('/getData',  Authenticate, (req,res) => {
    res.status(201).send(req.rootUser)
})
  
// Upload Document
router.post('/uploadDoc', upload, async (req,res) => {
    console.log(req.file)

    // Finding User in the database
    try {
        const id = req.body.User_id;

        const user = await User.findOne({_id: id})

        if (user){

            if (user.Certificates.length === 0)
                user.Certificates.push({})

            user.Certificates[0].filename = req.file.filename
            user.Certificates[0].status = 1
            user.Certificates[0].message = null

            // Saving Changes
            const SaveChanges = await user.save()

            if (SaveChanges){
                res.status(200).json({"File_Name" : req.file.fileName})
            }
            else {
                res.status(400).json({error : "File Not Uploaded. Try Again"})
            }
        }

    } catch(err) {
        console.log(err)
        res.status(400).json({error : "File Not Uploaded. Please Login First"})
    }
})


let gfs,gridFsBucket
// Initialising GridFs Stream
const conn = mongoose.connection;
conn.once('open', () => { 
    // Init Stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName : 'uploads'
    })
})

let gfs1

conn.once('open', () => {
    // Init Stream
    gfs1 = Grid(conn.db, mongoose.mongo)
    gfs1.collection('imageUploads')
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName : 'imageUploads'
    })
})



// To get All the files present in the database
router.get('/files',(req, res) => {
    gfs.files.find().toArray((err, files) => {

        // Check if files
        if (!files || files.length === 0){
            return res.status(400).json({
                err: 'No files exists'
            })
        }

        // Files exist
        return res.json(files);
    })
})


// To get a specific file from the database
router.get('/pdf/:filename', async (req, res) => {
    try {
        console.log(req.params)
        gfs.files.findOne({filename : req.params.filename
        }, (err, file) => {

            // Check if file exist or not
            if (!file || file.length === 0){
                return res.status(400).json({
                    err: 'No files exists'
                })
            }

            // Read output to browser
            const readStream  = gfs.createReadStream(file.filename)
            readStream.pipe(res)

        })
    } catch(err) {
        return res.status(400).json({error : "File Not Found"})
    }
}) 



module.exports = router