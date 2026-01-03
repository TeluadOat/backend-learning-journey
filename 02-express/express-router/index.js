const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters');
const adminRoutes = require('./routes/admin');

app.use('/shelters', shelterRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})