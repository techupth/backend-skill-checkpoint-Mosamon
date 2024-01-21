import { Router } from "express";
import { db } from "./utils/db.js";
import { ObjectId } from "mongodb";
const productRouter = Router();

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("question");
    const questionData = { ...req.body };
    const question = await collection.insertOne(questionData);
    return res.json({ message: "question has been added successfully" });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("question");
    const question = await collection.find({}).limit(100).toArray();
    return res.json({ data: question });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

productRouter.get("/:questionId", async (req, res) => {
  try {
    const collection = db.collection("question");
    const question = await collection.find(_id).toArray();
    return res.json({ data: question });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

productRouter.put("/:questionId", async (req, res) => {
  try {
    const collection = db.collection("question");
    const questionId = new ObjectId(req.params.questionId);
    const newquestionData = { ...req.body };
    await collection.updateOne(
      {
        _id: questionId,
      },
      {
        $set: newquestionData,
      }
    );
    return res.json({ message: "question has been updated successfully" });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

productRouter.delete("/:questionId", async (req, res) => {
  try {
    const collection = db.collection("question");
    const questionId = new ObjectId(req.params.questionId);
    await collection.deleteOne({ _id: questionId });
    return res.json({
      message: `Question (${questionId}) has been deleted successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});



export default productRouter;
