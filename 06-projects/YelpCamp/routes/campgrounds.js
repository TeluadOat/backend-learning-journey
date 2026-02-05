const express = require('express');
const router = express.Router();
const campgroundControllers = require('../controllers/campgrounds');
const validate = require('../middleware/validate');
const isLoggedIn = require('../middleware/isLoggedIn');
const { campgroundSchema } = require('../schemas');



router.get('/', campgroundControllers.index);

router.get('/new', isLoggedIn, campgroundControllers.newCampgroundForm);

router.get('/:id', campgroundControllers.showCampground);

router.post('/', validate(campgroundSchema), campgroundControllers.createCampground);

router.get('/:id/edit', campgroundControllers.editCampgroundForm);

router.put('/:id', validate(campgroundSchema), campgroundControllers.updateCampground);

router.delete('/:id', campgroundControllers.deleteCampground);

module.exports = router;