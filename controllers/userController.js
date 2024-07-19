const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a user
//@route Post /api/users/register
//@access private

const registerUser = asyncHandler(async(req, res) => {
  const {username, email, password}  = req.body;
  if(!username || !email || !password){
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userAvailable = await User.findOne({email});
  if(userAvailable){
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);

  if (user){
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
  }

  res.json({message:"User Registered"});
});

//@desc Login a user
//@route Post /api/users/login
//@access private

const loginUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const user = await User.findOne({email});
  // compare password with hashedpassword
  if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id : user.id,
      },
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"15m"}
  );
  res.status(200).json({accessToken});
}
else{
  res.status(401)
  throw new Error("Invalid Credentials");
}
  res.json({ message: "Login the user" });
}
);

//@desc Get current user
//@route Get /api/users/current
//@access private
const getCurrentUser = asyncHandler(async(req, res) => {
  // res.status(200).json(req.user);
  res.json(req.user);
}
);

module.exports = { registerUser, loginUser, getCurrentUser };