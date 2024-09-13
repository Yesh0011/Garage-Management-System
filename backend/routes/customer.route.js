import express from 'express';
import { customersignup, google, signOut, signin } from '../controllers/customer.controller.js';


const route = express.Router();

route.post('/customersignup',customersignup);
route.post('/signin',signin);
route.post('/google',google);
route.get('/signout',signOut);





export default route;