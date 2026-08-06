import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const { pricePerNight, roomType } = req.body;
    let amenities = [];
    if (req.body.amenities) {
      amenities = JSON.parse(req.body.amenities);
    }
    
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }

    const images = req.files ? req.files.map((file) => file.path) : [];

    const room = await Room.create({
      hotel: hotel._id,
      pricePerNight,
      amenities,
      roomType,
      images,
    });
    res.json({ success: true, message: "Room created successfully", room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true }).populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("hotel");
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }
    res.json({ success: true, room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getOwnerRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }
    const rooms = await Room.find({ hotel: hotel._id }).populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel || room.hotel.toString() !== hotel._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to modify this room" });
    }

    room.isAvailable = !room.isAvailable;
    await room.save();
    res.json({ success: true, message: "Room availability updated", room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};