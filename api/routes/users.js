module.exports = (router, db, mongojs, jwt, config, addLogs) => {
  router.use((req, res, next) => {
    console.log(`Tasks route accessed by: ${req.ip}`); // log visits

    /* Check for proper JWT */
    let authorization = req.get("auth");
    if (authorization) {
      jwt.verify(
        authorization,
        process.env.JWT_SECRET || config.JWT_SECRET,
        (error, decoded) => {
          if (error) {
            res
              .status(401)
              .send({ message: "Unauthorized access: " + error.message });
          } else {
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: "Unauthorized access. dumb dumb" });
    }
  });

  router.get("/:username", (req, res) => {
    var username = req.params.username;
    db.users.findOne({ username: username, isDeleted: false }, (err, docs) => {
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
    db.users.find(
      { username: req.params.username, isDeleted: false },
      (errFind, resFind) => {
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
              addLogs(req.params.username, "updated profile");
              res.status(200).send(doc);
            }
          }
        );
      }
    );
  });

  router.post("/update/:username", (req, res) => {
    db.members.find(
      { username: req.params.username, isDeleted: false },
      (errFind, resFind) => {
        let model = req.body;
        console.log(model);

        if (req.body.email === "") {
          model.email = resFind.email;
        }
        if (req.body.password === "") {
          model.password = resFind.password;
        }
        console.log(model);

        db.members.update(
          { username: req.params.username },
          { $set: model },
          (err, doc) => {
            if (err) {
              res.status(500).send("An error occured");
            } else {
              addLogs(req.params.username, "updated profile");
              res.status(200).send(doc);
            }
          }
        );
      }
    );
  });

  router.post("/upgrade/:username", (req, res) => {
    db.users.update(
      { username: req.params.username, isDeleted: false },
      { $set: { role: 1 } },
      (err, doc) => {
        if (err) {
          res.status(500).send("An error occured");
        } else {
          addLogs(req.params.username, "upgraded account");
          res.status(200).send(doc);
        }
      }
    );
  });

  router.post("/logs", (req, res) => {
    let skip = Number(req.body.page) || 0;
    let total = 0;
    db.logs.count({ username: req.body.username }, (error, response) => {
      if (!error) {
        total = response;
      }
    });
    db.logs
      .find({ username: req.body.username })
      .sort({ timestamp: -1 })
      .limit(5)
      .skip(skip * 5, (err, docs) => {
        if (err) {
          res.status(500).send("An error occured");
        } else {
          res.status(200).send({ total: total, records: docs });
        }
      });
  });
};
