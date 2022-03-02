const express = require("express");
const fs = require("fs");
const fsPromises = require("fs").promises;
const datafile = "server/data/clothing.json";
const router = express.Router();

/* GET all clothing */
router.route("/").get(async function (req, res) {
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

module.exports = router;
