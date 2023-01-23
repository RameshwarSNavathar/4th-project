const mongoose = require("mongoose");
let ObjectId =mongoose.Schema.Types.ObjectId

const blogModel = new mongoose.Schema({

title:{ 
    type: String,
    required:true },

body:{
  type:String,
  required: true },

authorId:{
  type:ObjectId,
  ref: "Author",
  require: true },

tags: [String],

category:{ 
  type:String,
  required: true },

subcategory: [String],

deletedAt:{ 
  type:String,
  default:""},

isDeleted:{ 
  type:Boolean,
  default: false },

publishedAt: {
  type: String ,
  default:""},

isPublished:{
  type:Boolean,
  default: false },

  },{ timestamps: true })

module.exports = mongoose.model("Blog", blogModel);
