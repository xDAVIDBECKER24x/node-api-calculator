const router = require("express").Router();
const { Operation, validate } = require("../models/operation");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const operation = await Operation.findOne({ operation: req.body.operation });

        result = 48;
        
	
		await new Operation({ ...req.body}).save();
		res.status(201).send({ message: "Operation created successfully", result: 48});
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
