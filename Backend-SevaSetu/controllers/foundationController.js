import { Foundations } from "../models/foundationsModels.js";

export const foundationDetail = async (req, res) => {
  try {
    const foundationId = req.params.id;
    const foundation = await Foundations.findById(foundationId);
    if (!foundation) {
      res.status(404)
      .json({ message: "Foundation not found" });
    }
    res.json(foundation);
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllfoundation = async (req,res) =>{
  try {
    const foundations = await Foundations.find({}, '_id');
    const foundationIDs = foundations.map((foundation) => foundation._id);
    // console.log(foundationIDs)
    if (!foundations) {
      res.status(404)
      .json({ message: "Foundation not found" });
    }
    res.status(200).json(foundationIDs);
  } catch (error) {
    console.error(error);
    console.log("error printed")
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
