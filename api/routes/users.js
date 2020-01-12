module.exports = (router, db, mongojs, jwt, config) => {
  router.get("/:username", (req, res) => {
    var username = req.params.username;
    db.users.findOne({ username: username }, (err, docs) => {
      if (!docs || err) {
        db.members.findOne(
          { username: username, isDeleted: false },
          (errMem, docMem) => {
            res.json({
              username: docMem.username,
              firstName: docMem.firstName,
              lastName: docMem.lastName,
              email: docMem.email,
              role: docMem.role,
              owner: docMem.owner
            });
          }
        );
      } else {
        res.json({
          username: docs.username,
          firstName: docs.firstName,
          lastName: docs.lastName,
          email: docs.email,
          role: docs.role
        });
      }
    });
  });
};
