const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  sizes: Number,
  description: String,
  price: Number,
  img: {
    type: String,
    default: "/baskets_uihdnr.jpg"
  },

  category: {
    type: String,
    enum: ["men", "women", "kids"]
  },
  id_tags: {
    type: Schema.ObjectId,
    ref: "tag"
  }
});

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;
