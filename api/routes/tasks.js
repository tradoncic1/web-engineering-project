module.exports = (router, db, mongojs, jwt, config) => {
  let role = 4;
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
            role = decoded.role;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: "Unauthorized access. dumb dumb" });
    }
  });

  router.post("/create/:projectKey", (req, res) => {
    db.tasks.insert(
      {
        username: req.body.username,
        title: req.body.title,
        description: req.body.description ? req.body.description : "",
        status: req.body.status ? req.body.status : 1,
        isDeleted: false,
        projectKey: req.params.projectKey
      },
      (error, response) => {
        if (error) {
          return res
            .status(400)
            .send(`Insertion failed! Reason: ${error.errmsg}`);
        } else {
          res.send(response);
        }
      }
    );
  });

  router.post("/search", async (req, res) => {
    if (role === 1) {
      db.tasks.find({ projectKey: req.body.projectKey }, (errTsk, docsTsk) => {
        if (docsTsk) {
          res.status(200).send(docsTsk);
        }
      });
    } else {
      db.tasks.find(
        { projectKey: req.body.projectKey, username: req.body.username },
        (errTsk, docsTsk) => {
          if (docsTsk) {
            res.status(200).send(docsTsk);
          }
        }
      );
    }
  });

  router.put("/status/:username", (req, res) => {
    const taskToUpdate = req.body.id;

    console.log(req.body);

    db.tasks.update(
      { _id: mongojs.ObjectId(taskToUpdate) },
      { $set: { status: req.body.status } },
      (error, response) => {
        if (error) {
          return res.status(400).send(`Update failed! Reason: ${error.errmsg}`);
        } else {
          res.send(response);
        }
      }
    );
  });

  router.put("/delete", (req, res) => {
    const taskToUpdate = req.body.id;

    db.tasks.update(
      { _id: mongojs.ObjectId(taskToUpdate) },
      { $set: { isDeleted: true } },
      (error, response) => {
        if (error) {
          return res.status(400).send(`Delete failed! Reason: ${error.errmsg}`);
        } else {
          res.send(response);
        }
      }
    );
  });
};
