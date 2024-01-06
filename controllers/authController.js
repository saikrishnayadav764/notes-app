const jwt = require("jsonwebtoken");

// Sample user data
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

exports.authenticateUser = (req, res, next) => {
  const jwtToken = req.header("Authorization");
  // Skiping authentication for the login route
  if (req.path === "/login") {
    return next();
  }

  if (!jwtToken) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }

  const token = req.header("Authorization").split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

exports.generateToken = (req, res) => {
  // verifying the username and password from your database
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const payload = {
    user: {
      username: user.username,
    },
  };

  jwt.sign(payload, "secret", { expiresIn: "1h" }, (err, token) => {
    if (err) throw err;
    res.status(200).json({ token });
  });
};
