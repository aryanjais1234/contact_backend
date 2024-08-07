const {constants} = require("../constants");

const errorHandler = (err,req,res,next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch(statusCode){
    case constants.VALIDATION_ERROR:
      res.json({tiitle:"Validation Failed",message: err.message, stackTrace:err.stack});
      break;
    case constants.NOT_FOUND:
      res.json({tiitle:"Not found",message: err.message, stackTrace:err.stack}); 
      break;
    case constants.SERVER_ERROR:
      res.json({tiitle:"Server Error",message: err.message, stackTrace:err.stack});
      break;
    case constants.UNAUTHORIZED:
      res.json({tiitle:"Unauthorized",message: err.message, stackTrace:err.stack});
      break;
    case constants.SERVER_ERROR:
      res.json({tiitle:"Server Error",message: err.message, stackTrace:err.stack});
      break;
    default:
      console.log("No Error All good !");
      break;
  }
  
   
}

module.exports = errorHandler;