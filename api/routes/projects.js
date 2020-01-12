module.exports = (router, db, mongojs, jwt, config) => {
  router.use((req, res, next) => {
    console.log(`Projects route accessed by: ${req.ip}`); // log visits

    /* Check for proper JWT */
    let authorization = req.get("auth");
    if (authorization) {
      jwt.verify(authorization, config.JWT_SECRET, (error, decoded) => {
        if (error) {
          res
            .status(401)
            .send({ message: "Unauthorized access: " + error.message });
        } else {
          next();
        }
      });
    } else {
      res.status(401).send({ message: "Unauthorized access." });
    }
  });

  router.get("/search/:username", (req, res) => {
    db.projects.find({ owner: req.params.username }, (err, docs) => {
      if (err) {
        res.status(500).send({ message: "Error fetching projects" });
      } else {
        res.send(docs);
      }
    });
  });

  router.post("/create/:username", (req, res) => {
    db.projects.insert(
      {
        key: req.body.key,
        name: req.body.name,
        description: req.body.description,
        owner: req.params.username
      },
      (err, doc) => {
        if (err) {
          res
            .status(500)
            .send({ message: "An error occuredwhile creating the project" });
        } else {
          console.log(doc);
          res.status(200).send(doc);
        }
      }
    );
  });
};
