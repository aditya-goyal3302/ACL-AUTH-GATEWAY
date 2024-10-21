const { error_handler } = require('../libs').utils;

module.exports =(err,req,res,next)=>{
    console.error(err.message);
    res.status(error_handler(err)).send(err.message);
}
