import express from 'express';
import {Activity} from '../models/activityModel.js'

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.duration ||
      !req.body.x 
    ) {
      return res.status(400).send({
        message: "Send all required fields"
      })
    }
    const newActivity = {
      name: req.body.name,
      duration: req.body.duration,
      x: req.body.x  
    };
    const activity = await Activity.create(newActivity);
    return res.status(201).send(activity);
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find({});
    return res.status(200).json({
      count: activities.length,
      data: activities
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const activity = await Activity.findById(id);
    return res.status(200).json(activity);
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.duration ||
      !req.body.x 
    ) {
      return res.status(400).send({
        message: "Send all required fields"
      })
    }

    const {id} = req.params;

    const result = await Activity.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({message: "Activity not found"})
    }
    return res.status(200).json({message: "Activity updated successfully"})
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;

    const result = await Activity.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({message: "Activity not found"})
    }
    return res.status(200).json({message: "Activity deleted successfully"})

  } catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

export default router;