module.exports = (router, db, mongojs, jwt, config) => {
  router.use((req, res, next) => {
    console.log(`Admin route accessed by: ${req.ip}`); // log visits

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
      res.status(401).send({ message: "Unauthorized access." });
    }
  });

  router.post("/:username", (req, res) => {
    db.tasks.insert(
      {
        username: req.params.username,
        title: req.body.title,
        description: req.body.description ? req.body.description : "",
        status: req.body.status ? req.body.status : 1,
        isDeleted: false
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

  router.get("/:username", (req, res) => {
    db.tasks.find(
      {
        username: req.params.username,
        isDeleted: false
      },
      { title: 1, description: 1, status: 1, _id: 1 },
      (error, response) => {
        if (error) {
          return res.status(400).send(`Fetch failed! Reason: ${error.errmsg}`);
        } else {
          res.send(response);
        }
      }
    );
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

  router.put("/:username", (req, res) => {
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
