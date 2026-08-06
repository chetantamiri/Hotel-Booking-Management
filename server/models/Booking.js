import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    hotel: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Hotel" },
    room: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Room" },
    user: { type: String, required: true, ref: "User" },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
