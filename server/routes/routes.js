const express = require("express");
const router = express.Router();
const boardDetail = require("../models/boardModel");

router.post("/user", async (req, res) => {
  try {
    const { title, description, category, author } = req.body;
    const detail = new boardDetail({ title, description, category, author });
    const result = await detail.save();
    return res.send(result);
  } catch (error) {
    return res.send({ message: error.message });
  }
});

router.get("/page", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    startIndex = (page - 1) * limit;
    endIndex = page * limit;
    const result = {};

    if (startIndex > 0) {
      result.prevResult = {
        page: page,
        limit,
      };
    }
    if (endIndex < boardDetail.length)
      result.nextResult = {
        page: page + 1,
        limit,
      };

    result.result = await boardDetail
      .find()
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.paginatedRes = result;

    res.json(res.paginatedRes);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/search/:title", async (req, res) => {
  try {
    const regex = new RegExp(req.params.title, "i");
    boardDetail
      .find({ title: regex })
      .then((data) => res.status(200).send(data));
  } catch (error) {}
});

router.get("/", async (req, res) => {
  try {
    const detail = await boardDetail.find({}).sort({ createdAt: -1 });

    if (req.query.category) {
      const data = detail.filter((card) => {
        if (card.category === req.query.category) return card;
      });
      return res.status(200).send(data);
    } else {
      return res.status(200).send(detail);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { title, description, category, author } = req.body;
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (author) updateData.author = author;

    const GetUpdate = await boardDetail.findOneAndUpdate({ _id }, updateData, {
      new: true,
    });
    return res.send(GetUpdate);
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;
