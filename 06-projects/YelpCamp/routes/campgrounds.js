const express = require('express');
const router = express.Router();
const campgroundControllers = require('../controllers/campgrounds');
const validate = require('../middleware/validate');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAuthor = require('../middleware/isAuthor');
const { campgroundSchema } = require('../schemas');
const upload = require('../config/multer');
const validateImageStorage = require('../middleware/validateImageStorage');



router.get('/', campgroundControllers.index);

router.get('/new', isLoggedIn, campgroundControllers.newCampgroundForm);

router.get('/:id', campgroundControllers.showCampground);

router.post('/', isLoggedIn, upload.array('images'), validateImageStorage, validate(campgroundSchema), campgroundControllers.createCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, campgroundControllers.editCampgroundForm);

router.put('/:id', isLoggedIn, isAuthor, upload.array('images'), validateImageStorage, validate(campgroundSchema), campgroundControllers.updateCampground);

router.delete('/:id', isLoggedIn, isAuthor, campgroundControllers.deleteCampground);

module.exports = router;