const { validationResult } = require("express-validator");
require("dotenv").config();

exports.getSuggetions = async (req, res, next) => {
  try {
    let checkValidations = await checkValidation(req, res);
    if (checkValidations) {
      return;
    }
    let bucketVolumes = req.body.buckets;
    let ballVolumes = req.body.balls;
    // sort balls as per volume
    bucketVolumes.sort((a, b) => b.volume - a.volume);
    let results = [];
    bucketVolumes.forEach((j, l) => {
      let volumeOfBucket = j.emptyVolume;
      let resultArray = [];
      ballVolumes.forEach((i, k) => {
        let count = 0;
        //Array of balls with diffrent color
        [...Array(i.count)].forEach((m, n) => {
          if (volumeOfBucket >= i.volume) {
            volumeOfBucket = volumeOfBucket - i.volume;
            count += 1;
          }
        });
        resultArray.push({ name: i.name, count: count });
      });
      j.emptyVolume = volumeOfBucket;
      results.push(
        `Bucket ${j.name}: Place ${resultArray.map((i) =>
          i.count != 0
            ? `${i.count} ${i.name} Ball${i.count == 1 ? "" : "s"} `
            : ""
        )} ${
          volumeOfBucket === 0
            ? ""
            : "and " +
              volumeOfBucket.toFixed(2) +
              " volume remains in the Backet"
        }`.replace(/,/g, "")
      );
    });

    // Main function to execute the program

    return res.send({
      status: true,
      statusCode: 200,
      message: "Data",
      data: {
        placedBalls: results,
      },
    });
  } catch (error) {
    console.log("error: get suggetions", error);
    return res.send({
      status: false,
      statusCode: 500,
      message: "Something Went Wrong!",
    });
  }
};

checkValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({
      status: 400,
      message: "Validation failed",
      data: errors,
    });
  }
};
exports.viewSuggetions = async (req, res, next) => {
  res.render("layout", {
    data:{
      emptyVolume: [ '0', '0', '0', '0', '0' ],
      volume: [ '0', '0', '0', '0', '0' ],
      count: [ '0', '0', '0', '0', '0' ]
    },
    responseData:""
  });
}
exports.viewSuggetionsPost = async (req, res, next) => {
  const data=req.body;
  let bucketVolumes = [];
  let ballVolumes = [];
  let alphabets=['A','B','C','D','E'];
  let colors=['Pink','Red','Blue','Orange','Green'];
  for (let i = 0; i < data.count.length; i++) {
    bucketVolumes.push({
      "id": i+1,
      "name":alphabets[i],
      "emptyVolume":Number(data.emptyVolume[i])
      })
      ballVolumes.push({
      "id": i+1,
      "name":colors[i],
      "volume":Number(data.volume[i]),
      "count":Number(data.count[i])
      })
  }

  bucketVolumes.sort((a, b) => b.volume - a.volume);
    let results = [];
    bucketVolumes.forEach((j, l) => {
      let volumeOfBucket = Number(j.emptyVolume);
      let resultArray = [];
      ballVolumes.forEach((i, k) => {
        let count = 0;
        //Array of balls with diffrent color
        [...Array(i.count)].forEach((m, n) => {
          if (volumeOfBucket >= i.volume) {
            volumeOfBucket = volumeOfBucket - i.volume;
            count += 1;
          }
        });
        resultArray.push({ name: i.name, count: count });
      });
      j.emptyVolume = volumeOfBucket;
      let totalFailure=[]
      resultArray.map((i) =>
           i.count === 0
            ? totalFailure.push(true)
            : ""
        )
      if(totalFailure.length!==ballVolumes.length){
    results.push(
        `Bucket ${j.name}: Place ${resultArray.map((i) =>
           i.count != 0
            ? `${i.count} ${i.name} Ball${i.count == 1 ? "" : "s"} `
            : ""
        )} ${
          volumeOfBucket === 0
            ? ""
            : "and " +
              volumeOfBucket.toFixed(2) +
              " volume remains in the Bucket"
        }`.replace(/,/g, "")
       )
      }else{
        results.push(
          `Bucket ${j.name}:Placement Can't be done!`)
      }
    });

  res.send({ 
    status: "success", message: "Form submitted successfully",
    data:data,
    placedBalls: results,

  });
}