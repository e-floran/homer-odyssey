import {combineReducers} from  'redux'
import  authReducer  from  './authReducer'
import flashReducer from './reducers/flashReducer'

const  allReducers  =  combineReducers({
    auth:  authReducer,
    flash: flashReducer,
});

export  default  allReducers;