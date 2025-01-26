const { tmail } = require("../TNexon");

async function verificationCodeController(req, res){
    const randomNumber = String(Math.random()*(1000000 - 100000) + 100000)
    const number = randomNumber.slice(0,3) + ' ' + randomNumber.slice(3)
    await tmail('tnoti.tnexon@gmail.com', '', req.body.email, 'The code of verification is:', '').then(() => res.status(200).send({message:'The code is sent.', code:number})).catch((err) => res.status(400).send(`An error occured\n${err}`))
    
}
module.exports = verificationCodeController