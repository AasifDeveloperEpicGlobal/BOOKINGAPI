import Rooom from '../models/Room.js';
import { createError } from '../utils/error.js';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

{/*CREATE ROOM*/ }
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const saveRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: saveRoom._id },
            });
        } catch (error) {
            next(err);
        }
        res.status(200).json(saveRoom);
    } catch (error) {
        next(err);
    }
};

{/*UPDATE ROOM*/ }
export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json(updateRoom)
    } catch (error) {
        next(error);
    }
}

{/*DELETE ROOM*/ }
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id},
            });
        } catch (error) {
            next(err);
        }
        res.status(200).json("Room has been deleted")
    } catch (error) {
        next(error);
    }
}

{/*GET ROOM*/ }
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)
    } catch (error) {
        next(error);
    }
}

{/*GET ALL ROOM*/ }
export const getRooms = async (req, res, next) => {
    // const failed = true;
    // if (failed) {
    //     return next(createError(401, "You are not authenticated"));
    // }

    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (error) {
        next(error);
    }
}