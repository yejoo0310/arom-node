import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  Title: { type: String },
  Content: { type: String },
});

const PostModel = mongoose.model("Post", PostSchema);

export { PostModel, PostSchema };
