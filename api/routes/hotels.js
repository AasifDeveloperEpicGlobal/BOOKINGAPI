import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post("/", createHotel); //verifyAdmin 

//UPDATE
router.put("/:id", updateHotel); //verifyAdmin

//DELETE
router.delete("/:id", deleteHotel); //verifyAdmin

//GET
router.get("/:id", getHotel);

//GET ALL
router.get("/", getHotels);

export default router