import  React from  'react'
import {connect} from  'react-redux';
import { updateMessageAction } from '../actions/flashActions';
import SnackbarContent from '@material-ui/core/SnackbarContent';

function PopUp ({ flash }) {
  
    return (
      <SnackbarContent
        message={flash.message}
        style={{ backgroundColor: "green" }}
      />
    );
  };
  
  const mapStateToProps = (state) => ({
    flash: state.flash,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    updateFlashMessage: (typeMessage, message) => dispatch(updateMessageAction(typeMessage, message)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PopUp);