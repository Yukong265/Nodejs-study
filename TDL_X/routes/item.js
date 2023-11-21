const router = require("express").Router();
const { verifyToken } = require("./middlewares");
const { Item } = require("../models");
const { User } = require("../models");

router.get("/item", verifyToken, async (req, res) => {
  const username = req.decoded.username;
  try {
    const items = await Item.findAll({
      where: { username: username },
    });
    return res.status(200).json({
      code: 200,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
});

router.post("/item", verifyToken, async (req, res) => {
  const username = req.decoded.username;
  const { title, description } = req.body;
  try {
    if(!title || !description) {
      return res.status()
    }
    await Item.create({
      title: title,
      description,
      username,
    });
    return res.status(200).json({
      code: 200,
      message: "create success",
      username,
      title,
      description,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
});

router.patch(`/item/:item_id`, verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const id = req.params.item_id;
  const username = req.decoded.username;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user.username != username) {
      return res.status(403).json({
        code: 403,
        message: "uncorrect username",
      });
    }
    const item = await Item.findAll({ where: { username: username } });
    if (!item[id]) {
      return res.status(404).json({
        code: 404,
        message: "not found",
      });
    }
    await Item.update(
      {
        title: title,
        description: description,
      },
      {
        where: {
          username: username,
          id: id,
        },
      }
    );
    return res.status(200).json({
      code: 200,
      message: "successful update",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
});

router.delete("/item/:item_id", verifyToken, async (req, res) => {
  const id = req.params.item_id;
  try {
    const items = await Item.findAll({ where: { username: username } });
    if (!items[id]) {
      return res.status(404).json({
        code: 404,
        message: "not found",
      });
    }
    await Item.delete({ where: { id: id, username: username } });
    return res.status(200).json({
      code:200,
      message: 'delete success'
    })
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
});

module.exports = router;
