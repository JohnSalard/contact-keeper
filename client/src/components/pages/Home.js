import React, { useContext, useEffect } from 'react';

// Components
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ContactFilter';

// Contexts
import AuthContext from '../../contexts/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
