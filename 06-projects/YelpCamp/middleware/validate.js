const ExpressError = require('../utils/ExpressError');

const validate = (schema, property = "body") => {
	return (req, res, next) => {
		const { value, error } = schema.validate(req[property], {
			abortEarly: false,
			stripUnknown: true
		});

		if (error) {
			const msg = error.details.map(el => el.message).join(',');
			throw new ExpressError(msg, 400);
		}
		req[property] = value;
		next();
	};
};

module.exports = validate;