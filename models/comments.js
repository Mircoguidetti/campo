const mongoose = require("mongoose");

//SCHEMA SETUP
const commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	time: {type: Date, default: Date.now}
},{usePushEach:true});

module.exports = mongoose.model("Comment", commentSchema);
