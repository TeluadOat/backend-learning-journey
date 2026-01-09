const express = require('express');
const router = express.Router();
const campgroundControllers = require('../controllers/campgrounds');
const validate = require('../middleware/validate');
const { campgroundSchema } = require('../schemas');



router.get('/', campgroundControllers.index);

router.get('/new', campgroundControllers.newCampgroundForm);

router.get('/:id', campgroundControllers.showCampground);

router.post('/', validate(campgroundSchema), campgroundControllers.createCampground);

router.get('/:id/edit', campgroundControllers.editCampgroundForm);

router.put('/:id', validate(campgroundSchema), campgroundControllers.updateCampground);

router.delete('/:id', campgroundControllers.deleteCampground);

module.exports = router;