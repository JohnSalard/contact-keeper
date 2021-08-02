import React, { useContext } from 'react';

// Context
import ContactContext from '../../contexts/contact/contactContext';

const ContactFilter = (props) => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter } = contactContext;

  const onChange = (e) => {
    if (e.target.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input type="text" name="" id="" placeholder="Filter contacts..." onChange={onChange} />
    </form>
  );
};

export default ContactFilter;
