import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//CREATE
router.post("/:hotelId", createRoom); //verifyAdmin 

//UPDATE
router.put("/:id", updateRoom); //verifyAdmin

//DELETE
router.delete("/:id/:hotelId", deleteRoom); //verifyAdmin

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

export default router