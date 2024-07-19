const express = require("express");
const router = express.Router();

const {getContacts,
createContact,
getContact,
updateContact,
deleteContact
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/details").get(getContacts);

router.route("/create").post(createContact);

router.route("/details/:id").get(getContact);

router.route("/update/:id").put(updateContact);

router.route("/delete/:id").delete(deleteContact);


module.exports = router;