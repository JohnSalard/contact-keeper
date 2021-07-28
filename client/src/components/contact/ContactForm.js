import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent } = contactContext;
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });
  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearCurrent();
  };

  const onClear = (e) => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
      <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
      <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
      <h5>Contact Type</h5>
      <input id="personal" type="radio" name="type" value="personal" onChange={onChange} checked={type === 'personal'} />
      <label htmlFor="personal">&nbsp;Personal&nbsp;</label>
      <input id="professional" type="radio" name="type" value="professional" onChange={onChange} checked={type === 'professional'} />
      <label htmlFor="professional">&nbsp;Professional&nbsp;</label>
      <div>
        <input type="submit" value={current ? 'Edit Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={onClear}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

// ContactForm.propTypes = {};

export default ContactForm;
