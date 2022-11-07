const mongoose = require("mongoose");
const Joi = require("joi");

const operationSchema = new mongoose.Schema({
	calc: { type: String, required: true },
	time: { type: Date, required: true },
});

const Operation = mongoose.model("operation", operationSchema);

const validate = (data) => {
	const schema = Joi.object({
		calc: Joi.string().required().label("Operation"),
		time: Joi.date().required().label("Date"),
	});
	return schema.validate(data);
};

module.exports = { Operation, validate };
