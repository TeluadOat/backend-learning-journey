const express = require('express');
const router = express.Router();
const app = express();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.send('You are not an admin!!');
})


router.get('/topsecret', (req, res) => {
    res.send('This is top secret admin data!');
});

router.get('/deleteeverything', (req, res) => {
    res.send('Deleted all data!!');
});

module.exports = router;