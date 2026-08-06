import Hotel from "../models/Hotel.js";
import User from "../models/user.js";

export const  registerHotel = async(req,res)=>{
    try{
        const {name,city,address,contact} = req.body;
        const owner = req.user._id;

        const hotel = await Hotel.findOne({owner})
        if(hotel){
            res.json({success : " false",message : "Hotel already registered"})
        }
        await Hotel.create({name,city,address,contact,owner})
        await User.findByIdAndUpdate(owner,{role : "hotelOwner"})
        res.json({success : true, message : "Hotel registered successfully"})
    }catch(error){
        console.log(error);
        res.status(500).json({success : false, message : "Internal server error"})
    }
}
   