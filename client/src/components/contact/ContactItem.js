import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = (props) => {
  const { id, name, email, phone, type } = props.contact;
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const checkType = () => (type === 'professional' ? 'badge-success' : 'badge-primary');

  const onDelete = (e) => {
    deleteContact(id);
    clearCurrent();
  };

  const onCurrent = (e) => {
    setCurrent(props.contact);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}&nbsp;
        <span style={{ float: 'right' }} className={`badge ${checkType()}`}>{`${type.charAt(0).toUpperCase()}${type.slice(1)}`}</span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" />
            &nbsp;{email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" />
            &nbsp;{phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={onCurrent}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
