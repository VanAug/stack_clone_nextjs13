import { Schema, models, model, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[]; // References to Question model
  followers: Schema.Types.ObjectId[]; // References to Follower model (future)
  createdOn: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }], // References to Question
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Placeholder for future Follower model
  createdOn: { type: Date, default: Date.now }, // Automatically set when a tag is created
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
