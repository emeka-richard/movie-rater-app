const express = require("express");
const collectionsRouter = express.Router();
const { getAllCollections, getEachCollection, updateExistingCollection, addNewCollection, deleteExistingCollection } = require("../controllers/collectionsController");

collectionsRouter
  .route("/")
  .get(getAllCollections)
  .post(addNewCollection)
  .put(updateExistingCollection)
  .delete(deleteExistingCollection)

collectionsRouter.route('/:id').get(getEachCollection);

module.exports = collectionsRouter;
