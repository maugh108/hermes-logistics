import User from "../models/User";

export const checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
  });
};
