module.exports.index = (req, res) => {
    res.send('All shelters!!');
};

module.exports.createShelter = (req, res) => {
    res.send('Creating a new shelter!!');
}

module.exports.showShelter = (req, res) => {
    res.send('Shelter details!!');
}

module.exports.deleteShelter = (req, res) => {
    res.send('Deleting a shelter!!');
}