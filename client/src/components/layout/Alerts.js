import React, { Fragment, useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AlertContext from '../../contexts/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    <Fragment>
      <TransitionGroup>
        {alerts.length > 0 &&
          alerts.map((alert) => (
            <CSSTransition key={alert.id} timeout={1500} classNames="alert">
              <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" />
                &nbsp;{alert.msg}
              </div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Alerts;
