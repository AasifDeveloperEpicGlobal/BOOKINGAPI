import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post("/", createHotel); //verifyAdmin 

//UPDATE
router.put("/:id", updateHotel); //verifyAdmin

//DELETE
router.delete("/:id", deleteHotel); //verifyAdmin

//GET
router.get("/find:/:id", getHotel);

//GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router