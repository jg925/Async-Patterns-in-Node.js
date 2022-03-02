const express = require("express");
const fs = require("fs");
const fsPromises = require("fs").promises;
const datafile = "server/data/clothing.json";
const router = express.Router();

module.exports = function (monitor) {
  let dataMonitor = monitor;

  dataMonitor.on("dataAdded", (item) => {
    setImmediate(() => console.log(`New data was added: ${item}`));
  });

  /* GET all clothing */
  router
    .route("/")
    .get(async function (req, res) {
      try {
        let data = await getClothingData();
        console.log("returning async data");
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }

      /*getClothingData()
    .then((data) => {
      console.log("returning clothing data");
      res.send(data);
    })
    .catch((err) => res.status(500).send(err))
    .finally(() => console.log("All done")); */
      console.log("doing more work");
    })

    .post(async function (req, res) {
      try {
        let data = await getClothingData();

        let nextID = getNextAvailableID(data);

        let newClothingItem = {
          clothingID: nextID,
          itemName: req.body.itemName,
          price: req.body.price,
        };

        data.push(newClothingItem);
        await saveClothingData(data);

        dataMonitor.emit("dataAdded", newClothingItem.itemName);

        console.log("returning new item to browser");

        res.status(201).send(newClothingItem);
      } catch (err) {
        res.status(500).send(err);
      }
    });

  async function getClothingData() {
    let rawData = await fsPromises.readFile(datafile, "utf-8");
    let clothingData = JSON.parse(rawData);
    console.log(clothingData);
    return clothingData;
    /* return new Promise((resolve, reject) => {
    fs.readFile(datafile, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let clothingData = JSON.parse(data);
        resolve(clothingData);
      }
    });
  }); */
  }

  function getNextAvailableID(allClothingData) {
    let maxID = 0;

    allClothingData.forEach(function (element, index, array) {
      if (element.clothingID > maxID) {
        maxID = element.clothingID;
      }
    });
    return ++maxID;
  }

  function saveClothingData(data) {
    return fsPromises.writeFile(datafile, JSON.stringify(data, null, 4));
  }

  return router;
};
