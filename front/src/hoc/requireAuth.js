import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

const requireAuth = (ComposedComponent) => {
  const Authentification = (props) => {
    const history = useHistory();

    useEffect(() => {
      if (!props.authenticated) {
        history.push('/signin');
      }
    }, [props.authenticated, history]);

    return <ComposedComponent {...props} />;
  };

  const mapStateToProps = (state) => ({
    authenticated: state.auth.token ? true : false,
  });

  return connect(mapStateToProps)(Authentification);
};

export default requireAuth;