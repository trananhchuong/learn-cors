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
    {
      id: 3,
      userId: 1,
      title: "Post 3",
      content: "This is post 3",
    },
  ],
};

// session
const session = {};

router.get("/api/posts", async (req, res) => {
  res.json(db.posts);
});

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const sessionId = Math.random().toString(36).substring(7);
    session[sessionId] = {
      userId: user.id,
    };
    res
      .setHeader(
        "Set-Cookie",
        `sessionId=${sessionId}; HttpOnly; max-age=3600; SameSite=None; Secure`
      )
      .json(user);
    return;
  }

  // res.setHeader("Set-Cookie", "sessionId=; HttpOnly");
  return res.status(401).json({ message: "Unauthorized" });
});

router.get("/api/me", async (req, res) => {
  const { sessionId } = req.cookies;
  const sessionData = session[sessionId];
  if (sessionData) {
    const user = db.users.find((user) => user.id === sessionData.userId);
    if (user) {
      return res.status(200).json(user);
    }
  }
  res.status(401).json({ message: "Unauthorized" });
});

router.get("/api/logout", async (req, res) => {
  const { sessionId } = req.cookies;
  delete session[sessionId];
  res.setHeader("Set-Cookie", "sessionId=; HttpOnly; max-age=0");
  res.json({ message: "Success" });
});

module.exports = router;
