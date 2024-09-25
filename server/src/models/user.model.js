import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    fullname : {
        type:String,
        requird:true,
        lowercase:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
},
   {
    timestamps: true,
   }
);

export const User = mongoose.model("User", userSchema);