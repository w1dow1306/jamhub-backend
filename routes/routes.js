const express = require('express')
const USERroutes = express.Router();
const TODOSroutes = express.Router();

const userfunc = require('../handlers/user-db.js');
const todofunc = require('../handlers/todo-db.js');


//userroutes
USERroutes.get('/all', userfunc.getALLUSERS);
USERroutes.post('/add', userfunc.addNEWUSER);
USERroutes.post('/login', userfunc.loginUSER);
USERroutes.all('/logout', userfunc.logoutUser);


//todo routes
TODOSroutes.get('/all', todofunc.getAlltodos);
// TODOSroutes.get('/u/:id', todofunc.getIdtodos);
TODOSroutes.get('/my', todofunc.getmytodos);
TODOSroutes.post('/create', todofunc.createtodo);
TODOSroutes.post('/delete', todofunc.deletetodo);
TODOSroutes.post('/update', todofunc.updatetodo);

module.exports = { USERroutes, TODOSroutes };