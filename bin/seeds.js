const mongoose = require("mongoose");
const Sneaker = require("../models/Sneaker");

const Sneakers = [
  {
    name: "Jordan XV",
    ref: "123456789",
    sizes: [42, 43, 44, 40, 41],
    description: "AMAZING SNEAKERS",
    price: 499,
    category: {
      type: "Basket",
      enum: ["men"]
    },
    id_tags: {
      type: Schema.types.ObjectId,
      ref: "tag"
    }
  },
  {
    name: "UGG",
    ref: "0066600666",
    sizes: [35, 36, 37, 38, 39],
    description: "(almost) AMAZING SNEAKERS",
    price: 199,
    category: {
      type: "Good question",
      enum: ["women", "kids"]
    },
    id_tags: {
      type: Schema.types.ObjectId,
      ref: "tag"
    }
  },
  {
    name: "Batman Sneakers",
    ref: "2003488504943",
    sizes: [34, 35, 36, 37, 38, 39, 41, 42, 43, 40],
    description: "BATMAZING SNEAKERS",
    price: 299,
    category: {
      type: "Sneakers to fight evil",
      enum: ["women", "kids", "men"]
    },
    id_tags: {
      type: Schema.types.ObjectId,
      ref: "tag"
    }
  }
];
