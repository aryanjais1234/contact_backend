const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});
//@desc Create New contacts
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  // const contact = new Contact({
  //   name,
  //   email,
  //   phone,
  // });
  // const createdContact = await contact.save();

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id : req.user.id,
  });
  res.status(200).json(contact);
});

//@desc Get individual contacts
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User doest not have permission to change oter user contacts");
  }
  // const { name, email, phone } = req.body;
  // if (name) contact.name = name;
  // if (email) contact.email = email;
  // if (phone) contact.phone = phone;
  // await contact.save();

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )
  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User doest not have permission to change oter user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
