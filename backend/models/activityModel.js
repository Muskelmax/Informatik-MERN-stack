import mongoose from "mongoose";

const activitySchema = mongoose.Schema(
  {
    name: {type: String, required: true},
    duration: {type: Number, required: true},
    x: {type: Number, required: true}
  },
  {
    timestamps: true
  }
)

export const Activity = mongoose.model('Activity', activitySchema) 