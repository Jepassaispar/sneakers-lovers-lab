const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tag = require("../models/Tag");

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  sizes: Number,
  description: String,
  price: Number,
  img: {
    type: String,
    default: 'https://images-na.ssl-images-amazon.com/images/I/71un1O0nQOL._UY500_.jpg'
  },
  category: {
    type: String,
    enum: ["men", "women", "kids"]
  },
  id_tags: {
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }
});

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;