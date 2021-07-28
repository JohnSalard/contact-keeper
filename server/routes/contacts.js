const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
// @route       GET api/contacts
// @desc        Get all users contacts
// @access      Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/contacts
// @desc        Add new contact
// @access      Private
router.post(
  '/',
  [authMiddleware, check('name', 'Name is required.').not().isEmpty(), check('email', 'Please include a valid email.').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      let newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private
router.put(
  '/:id',
  [authMiddleware, check('name', 'Name is required.').not().isEmpty(), check('email', 'Please include a valid email.').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    let contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
    try {
      const contactId = req.params.id;
      let contact = await Contact.findById(contactId);

      if (!contact) return res.status(404).json({ msg: 'Contact not exists' });

      // Check user owns contact
      if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

      contact = await Contact.findByIdAndUpdate(contactId, { $set: contactFields }, { new: true });
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Private
router.delete('/:id', [authMiddleware], async (req, res) => {
  try {
    const contactId = req.params.id;
    let contact = await Contact.findById(contactId);

    if (!contact) return res.status(404).json({ msg: 'Contact not exists' });

    // Check user owns contact
    if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    contact = await Contact.findByIdAndRemove(contactId);
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
