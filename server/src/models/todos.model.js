import mongoose, { model, Schema } from "mongoose";

const todoSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    todo: {
        type: String,
        required: true,
        trim: true,
        index : true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
},
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);