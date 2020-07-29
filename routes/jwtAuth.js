const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGen");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
//register
router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check user exist
    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).send("User already registered !!!");
    }
    // bcrypt user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //enter new user in db
    const newUser = await pool.query(
      "INSERT INTO users (user_email,user_name,user_password) VALUES($1,$2,$3) RETURNING *",
      [email, name, bcryptPassword]
    );
    //generating jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
//login
router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user exist
    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send("Email or password is incorrect!!!");
    }
    // bcrypt compare user  password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    //
    if (!validPassword)
      return res.status(401).send("Email or password is incorrect!!!");
    //generating jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
