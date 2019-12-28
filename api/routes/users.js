module.exports = (router, db, mongojs, jwt, config) => {
  router.get("/:username", (req, res) => {
    var username = req.params.username;
    db.users.findOne({ username: username }, function(err, docs) {
      res.json({
        username: docs.username,
        firstName: docs.firstName,
        lastName: docs.lastName,
        email: docs.email
      });
    });
  });
};
