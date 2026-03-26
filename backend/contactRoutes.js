const express = require("express");
const router = express.Router();

const {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} = require("./contactController");

router.get("/", getContacts);
router.post("/", createContact);
router.delete("/:id", deleteContact);
router.put("/:id", updateContact);

module.exports = router;