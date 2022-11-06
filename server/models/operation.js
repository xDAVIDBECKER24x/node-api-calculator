const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const operationSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	operation: { type: String, required: true },
	date: { type: Date, required: true },
});

const Operation = mongoose.model("operation", operationSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		operation: Joi.string().required().label("Operation"),
		date: Joi.date().required().label("Date"),
	});
	return schema.validate(data);
};

module.exports = { Operation, validate };
