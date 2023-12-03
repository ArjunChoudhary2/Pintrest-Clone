var express = require("express");
var router = express.Router();
const userModel = require("./users");

const postModel = require("./posts");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/createuser", async function (req, res, next) {
  let createdUser = await userModel.create({
    username: "Arjun",
    password: "212207",
    posts: [],
    email: "arjuncy14@gmail.com",
    fullName: "Arjun Choudhary",
  });

  res.send(createdUser);
});

router.get("/createpost", async function (req, res, next) {
  let createdPost = await postModel.create({
    postText: "My First Post",
    user: "656c463a413794126bf3b57e",
  });

  let user = await userModel.findOne({ _id: "656c463a413794126bf3b57e" });
  user.posts.push(createdPost._id);
  await user.save();
  res.send("Done");
});

router.get("/alluserposts", async function (req, res, next) {
  let user = await userModel.find({ _id: "656c463a413794126bf3b57e" }).populate('posts')
  res.send(user);
});

module.exports = router;
