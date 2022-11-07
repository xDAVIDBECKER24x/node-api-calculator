const mongoose = require("mongoose");
const Joi = require("joi");

const operationSchema = new mongoose.Schema({
	operation: { type: String, required: true },
	date: { type: Date, required: true },
});

const Operation = mongoose.model("operation", operationSchema);

const validate = (data) => {
	const schema = Joi.object({
		operation: Joi.string().required().label("Operation"),
		date: Joi.date().required().label("Date"),
	});
	return schema.validate(data);
};

module.exports = { Operation, validate };
