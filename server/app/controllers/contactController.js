let contactModel = require('../models/contactModel');

module.exports.create = async function (req, res, next) {
    try {
        let newContact = new contactModel(req, body);
        let contact = await contactModel.create(newContact);
        return res.status(200).json(contact);
    } catch (error) { next(error); }
}