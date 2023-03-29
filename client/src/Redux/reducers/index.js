import { combineReducers } from "redux";
import { userReducer } from "./userReducer"
import { hackReducer } from './hackReducer';
import {productReducer } from './productReducer';
import {adminReducer} from './adminReducer'


export const rootReducer = combineReducers({ adminReducer,hackReducer ,userReducer, productReducer})