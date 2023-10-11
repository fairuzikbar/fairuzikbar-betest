const db = require("../models");
const Betest = db.betests;

// Create and Save a new Betest
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a data
  const betest = new Betest({
    id: req.body.id,
    userName: req.body.userName,
    accountNumber: req.body.accountNumber,
    emailAddress: req.body.emailAddress,
    identityNumber: req.body.identityNumber,
  });

  // Save data in the database
  betest
    .save(betest)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating data.",
      });
    });
};

// Retrieve all data from the database.
exports.findAll = (req, res) => {
  const userName = req.query.userName;
  var condition = userName
    ? { userName: { $regex: new RegExp(userName), $options: "i" } }
    : {};

  Betest.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// Find a single data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Betest.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found data with id = " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving data with id = " + id + ", because id must be type of objectId"});
    });
};

// Find a single data with an Account Number
exports.findOneAccount = (req, res) => {
  const accountNumber = req.params.accountNumber;

  Betest.find({accountNumber})
    .then((data) => {
      if (data.length == 0)
        res.status(404).send({ message: "Not found data with account number = " + accountNumber });
      else res.send(data);
      console.log(data.length)
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving data with account number = " + accountNumber });
      console.log(err)
    });
};

// Find a single data with an Account Number
exports.findOneIdentity = (req, res) => {
  const identityNumber = req.params.identityNumber;

  Betest.find({identityNumber})
    .then((data) => {
      if (data.length == 0)
        res.status(404).send({ message: "Not found data with identity number = " + identityNumber });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving data with identity number = " + identityNumber });
    });
};

// Update a data by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Betest.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update data with id=${id}. Maybe data was not found!`,
        });
      } else res.send({ message: "data was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating data with id=" + id,
      });
    });
};

// Delete a data with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Betest.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete data with id=${id}. Maybe data was not found!`,
        });
      } else {
        res.send({
          message: "Data was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete data with id=" + id,
      });
    });
};

// Delete all data from the database.
exports.deleteAll = (req, res) => {
  Betest.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} data were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all data.",
      });
    });
};
