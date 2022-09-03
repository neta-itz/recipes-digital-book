const validateRegistration = require("./usersValidations/registraion");
const validateSignin = require("./usersValidations/signIn");
var nodemailer = require("nodemailer");
var generate = require("generate-password");

const {
  comparePassword,
  generateHashPassword,
} = require("../../services/bcrypt");
const { generateAuthToken } = require("../../services/token");
const _ = require("lodash");
const router = require("express").Router();
const User = require("./userModel");
const auth = require("../../middlewares/authorization");

router.post("/register", async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", "recipes"]));

  user.password = generateHashPassword(user.password);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/login", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = comparePassword(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  res.json({
    token: generateAuthToken(user),
  });
});

router.get("/userInfo", auth, (req, res) => {
  let user = req.user;

  User.findById(user._id)
    .select(["-password", "-createdAt", "-__v"])
    .then((user) => res.json(user))
    .catch((errorsFromMongoose) => res.status(500).json(errorsFromMongoose));
});

router.get("/favorites", auth, (req, res) => {
  let user = req.user;

  User.findById(user._id)
    .select(["favorites"])
    .populate("favorites")
    .then((user) => res.json(user))
    .catch((errorsFromMongoose) => res.status(500).json(errorsFromMongoose));
});

router.put("/addFavorite/:recipeID", auth, (req, res) => {
  let user = req.user;
  User.updateOne(
    { _id: user._id },
    { $push: { favorites: req.params.recipeID } }
  )
    .then((data) => res.json(data))
    .catch((errorsFromMongoose) => {
      console.log(errorsFromMongoose);
      res.status(500).json(errorsFromMongoose);
    });
});

router.put("/removeFavorite/:recipeID", auth, (req, res) => {
  let user = req.user;
  User.updateOne(
    { _id: user._id },
    { $pull: { favorites: req.params.recipeID } }
  )
    .then((data) => res.json(data))
    .catch((errorsFromMongoose) => res.status(500).json(errorsFromMongoose));
});

router.post("/reset-password", async function (req, res) {
  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("User already registered.");

  if (user.resetPassword && user.resetPassword == req.body.resetPassword) {
    user.password = generateHashPassword(req.body.password);
    await user.save();
    return res.send("seccess");
  } else {
    return res.status(400).send("Varification worng");
  }
});

router.post("/reset-password-code", async function (req, res) {
  let data = await User.findOne({ email: req.body.email });

  if (data) {
    var newPassword = generate.generate({
      length: 4,
      numbers: true,
      symbols: false,
      lowercase: false,
      uppercase: false,
      strict: false,
    });

    // create transporter object with smtp server details
    var transporter = nodemailer.createTransport({
      service: "Outlook",
      port: 25,
      auth: {
        user: "",
        pass: "",
      },
      secure: false,
      host: "smtp-mail.outlock.com",
    });

    var mailOptions = {
      from: "netaitz@outlook.com",
      to: `${data.email}`,
      subject: "Reset Password",
      text: `new passwors is:
            ${newPassword}`,
    };

    await User.findByIdAndUpdate(data._id, { resetPassword: newPassword });
    res.json({ success: true, error: false, code: newPassword });
    // send email
    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //     res.json({ success: false, error: true });
    //   } else {
    //     res.json({ success: true, error: false });
    //   }
    // });
  }
});

module.exports = router;
