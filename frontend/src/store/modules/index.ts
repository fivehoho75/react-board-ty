import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

// imports all file except index.js
const req = require.context('.', true, /^(?!.\/index)(?!.\/__tests__).*.ts$/);
const modules: any = {};

req.keys().forEach((key: any) => {
  const regex = /.\/(.*?).ts$/;
  const moduleName = regex.test(key) && key.match(regex)[1];
  console.log('==' + moduleName + '/' + req(key).default);
  modules[moduleName] = req(key).default;
});

modules.pender = penderReducer;

export default combineReducers(modules);
