const mongoose = require("mongoose");


const connectDb = async () =>{
  try{
    const connect = await mongoose.connect("mongodb+srv://aryanjais1234:aryan@aryancluster.cmirogy.mongodb.net/mycontacts-backend?retryWrites=true&w=majority&appName=aryancluster");
    console.log("connected",
    connect.connection.host,
    connect.connection.name,
    );
  }
  catch (err) {
    console.log(err);
    process.exit;
  }
}

module.exports = connectDb;