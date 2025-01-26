const bcrypt = require('bcrypt')
const multer = require('multer')
const tmail = (email, password, destEmail, subject, html) =>{ 

    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:email,
            pass:password
        }
    })
    
    var mailOptions = {
        from:email, 
        to: destEmail,
        subject:subject,
        html:html
    }
    
    return transporter.sendMail(mailOptions)
}


const register = async(req, res) =>{
    const {username, email, password} = req.body
    if(!username || !email || !password){
        return res.status(400).send('The field(s) are missing.')
    }
    if(username.length < 4){
        return res.status(400).send('The username should contains more than 4 characters.')
    }
    if(!/^[^@]+@gmail.com/.test(email) || /^[^@]+/.exec(email)[0].length < 8){
        return res.status(400).send('The email is invalid')
    }
    if(password.length < 5 || !/\d/.test(password)) {
        return res.status(400).send('The password is not valid.')
    }
    const user = await userModel.findOne({$or:[{username:username}, {email:email}]})
    if(user){
        return res.status(400).send('The user already exist.')
    }
    const cryptPass =  await bcrypt.hash(password, 5)
    const newUser = new userModel({username:username, email:email, password:cryptPass})
    await newUser.save()
    .catch((error)=>res.status(400).send(error))
    await tmail('renoluxcameroun@gmail.com', 'ratdafwbjdqbilpt', email, 'Nouveau admininstrateur Renolux', "<h1 style='color:'blue'>Bienvenue dans l\'espace administrateur de renolux cameroun.</h1>")
    .then((value) => {console.log(value.response); res.status(200).send(value.response)})
    .catch((error) => console.log('An error occured while sending message', error))
}

const login = async (req, res) => {
    const {usernameoremail, password} = req.body
    if(!usernameoremail || !password) return res.status(400).send('empty fields')
    const user = await AdminModel.findOne({$or:[{username:usernameoremail}, {email:usernameoremail}]}).catch((error)=>res.status(400).send(error))
    if(!user) return res.status(400).send('Invalid credential')
    const goodPassowrd = await bcrypt.compare(password, user.password).catch((error)=>res.status(400).send(error))
    if(goodPassowrd){
        const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY)
        return res.send(`successfully logged, ${token}`)   
    }
    res.send('invalid credentials.')
}

const passwordRecovery = async (req, res) =>{
    const {email} = req.body
    const code = Math.floor(Math.random()*(199999 - 100000) + 100000)
    const codeString = String(code).slice(0, 3) + ' ' + String(code).slice(3)
    await tmail('renoluxcameroun@gmail.com', 'ratdafwbjdqbilpt', email, 'Voici le code pour modifier ton mot de passe', `<h2>Votre code de verification </h2><h1>${codeString}</h1>`)
    .then((value)=>res.status(200).send({message:value.response, code:code}))
    .catch((error)=>res.status(400).send(error))

}

const passwordChange = async (req, res) => {
    const {email, password} = req.body
    const cryptPass =  await bcrypt.hash(password, 5)
    if(!email || !password) return res.send('The values fields are missing.')
    await AdminModel.updateOne({email:req.body.email}, {password:cryptPass})
    .then(()=>res.send('Password successfully changed.'))
    .catch((reason)=>res.send(`An error occured. \nThe reason is ${reason}`)) 
}

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'public/profile/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    } 
})

const authRoute = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token) return res.status(401).send("you have to provide a token.")
    const payload = process.env.SECRET_KEY
    jwt.verify(token,payload, (err, user) => {
    if(err){
        res.status(403).send(err)
        return;
    }
    req.user = user
    next()
    })
}

const upload = multer({storage:storage})

module.exports = {tmail}