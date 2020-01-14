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

  router.post("/update/:username", (req, res) => {
    db.users.find({ username: req.params.username }, (errFind, resFind) => {
      let model = req.body;
      console.log(model);

      if (req.body.email === "") {
        model.email = resFind.email;
      }
      if (req.body.password === "") {
        model.password = resFind.password;
      }
      console.log(model);

      db.users.update(
        { username: req.params.username },
        { $set: model },
        (err, doc) => {
          if (err) {
            res.status(500).send("An error occured");
          } else {
            res.status(200).send(doc);
          }
        }
      );
    });
  });

  router.post("/upgrade/:username", (req, res) => {
    db.users.update(
      { username: req.params.username },
      { $set: { role: 1 } },
      (err, doc) => {
        if (err) {
          res.status(500).send("An error occured");
        } else {
          res.status(200).send(doc);
        }
      }
    );
  });
};
