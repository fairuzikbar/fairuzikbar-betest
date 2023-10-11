module.exports = app => {
    const betests = require("../controllers/betest.contoller.js");
  
    var router = require("express").Router();
  
    // Create a new data
    router.post("/", betests.create);
  
    // Retrieve all data
    router.get("/", betests.findAll);
  
    // Retrieve a single data with id
    router.get("/:id", betests.findOne);

    // Retrieve a single data with account
    router.get("/account/:accountNumber", betests.findOneAccount);
    
    // Retrieve a single data with account
    router.get("/identity/:identityNumber", betests.findOneIdentity);
  
    // Update a data with id
    router.put("/:id", betests.update);
  
    // Delete a data with id
    router.delete("/:id", betests.delete);
  
    // Delete all data
    router.delete("/", betests.deleteAll);
  
    app.use('/api/betest', router);
  };