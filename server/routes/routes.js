const router = require("express").Router();

// fake DB
const db = {
  users: [
    {
      id: 1,
      username: "chapter@gmail.com",
      password: "Chapter@123",
      name: "Chapter",
    },
  ],
  posts: [
    {
      id: 1,
      userId: 1,
      title: "Post 1",
      content: "This is post 1",
    },
    {
      id: 2,
      userId: 1,
      title: "Post 2",
      content: "This is post 2",
    },
  ],
};

// session
const session = {};

router.get("/api/posts", async (req, res) => {
  res.json(db.posts);
});

module.exports = router;
