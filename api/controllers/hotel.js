import Hotel from "../models/Hotel.js";

{/*CREATE HOTEL*/ }
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        next(error);
    }
}

{/*UPDATE HOTEL*/ }
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error);
    }
}

{/*DELETE HOTEL*/ }
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted")
    } catch (error) {
        next(error);
    }
}

{/*GET HOTEL*/ }
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    } catch (error) {
        next(error);
    }
}

{/*GET ALL HOTEL*/ }
export const getHotels = async (req, res, next) => {
    // const failed = true;
    // if (failed) {
    //     return next(createError(401, "You are not authenticated"));
    // }

    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels)
    } catch (error) {
        next(error);
    }
}

{/*GET COUNTBYCITY*/ }
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    console.log(cities);
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        const hotels = await Hotel.find();
        res.status(200).json(list)
    } catch (error) {
        next(error);
    }
}

{/*GET COUNTBYTYPE*/ }
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount }
        ])
    } catch (error) {
        next(error);
    }
}