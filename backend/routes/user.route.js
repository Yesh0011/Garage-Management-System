
import express from "express";
// import {
//   deleteCustomer,
//   deleteUser,
//   test,
//   updateCustomer,
//   updateUser,
//   getUserListings,
// } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

import { deleteCustomer, deleteUser, deleteUser2, getAll, getOne, getUserListings, test, update, updateCustomer, updateUser } from '../controllers/user.controller.js';



const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateCustomer);
router.delete("/delete/:id", verifyToken, deleteCustomer);
router.post("/updatestaff/:id", verifyToken, updateUser);
router.delete("/deletestaff/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
  router.get("/getall",getAll);
  router.get("/getone/:id",getOne);
  router.put("/update2/:id",update);
  router.delete("/delete2/:id",deleteUser2);



    export default router;

