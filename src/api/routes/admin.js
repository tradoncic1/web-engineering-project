module.exports = (router, db, mongojs, jwt, config) => {
  router.use((req, res, next) => {
    console.log(`Admin route accessed by: ${req.ip}`); // log visits

    /* Check for proper JWT */
    let authorization = req.get("auth");
    if (authorization) {
      jwt.verify(authorization, config.JWT_SECRET, (error, decoded) => {
        if (error) {
          res
            .status(401)
            .send({ message: "Unauthorized access: " + error.message });
        } else {
          let userType = decoded.role;
          if (userType === 1) {
            next();
          } else {
            res
              .status(401)
              .send({ message: "Unauthorized access: Improper privileges" });
          }
        }
      });
    } else {
      res.status(401).send({ message: "Unauthorized access." });
    }
  });

  /**
   * @swagger
   * /admin/users:
   *   get:
   *     tags:
   *       - users
   *     name: users
   *     summary: Get all users in system
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: List of all users in system
   *       500:
   *         description: Something is wrong with service please contact system administrator
   */
  router.get("/users", (req, res) => {
    db.users.find({}, (err, docs) => {
      res.json(docs);
    });
  });

  /**
   * @swagger
   * /admin/users/{username}:
   *   get:
   *     tags:
   *       - users
   *     name: getUser
   *     summary: Get a user from the system by their username
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         in: path
   *         description: username of the user
   *         required: true
   *         type: string
   *         default: 'kiradon'
   *     responses:
   *       200:
   *         description: List a single user from the system
   *       400:
   *           description: Invalid user request.
   *       401:
   *           description: Unauthorized access.
   *       500:
   *         description: Something is wrong with the service. Please contact the system administrator.
   */
  router.get("/users/:username", (req, res) => {
    var username = req.params.username;
    db.users.findOne({ username: username }, function(err, docs) {
      res.json(docs);
    });
  });
};
