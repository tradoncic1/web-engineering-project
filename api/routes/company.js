module.exports = (router, db, mongojs, jwt, config, nodemailer) => {
  router.use((req, res, next) => {
    console.log(`Company route accessed by: ${req.ip}`); // log visits

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
   * /company/users:
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
   * /company/users/{username}:
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

  router.post("/members/:username", async (req, res) => {
    console.log("Create members route");

    try {
      await db.members.findOne(
        { username: req.body.username },
        async (err, docs) => {
          if (docs != null) {
            return res.status(404).send({ message: "username" });
          }
          await db.members.findOne(
            { email: req.body.email },
            (errMail, docsMail) => {
              if (docsMail != null) {
                return res.status(404).send({ message: "email" });
              }
            }
          );

          let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false,
            port: 587,
            auth: {
              user: config.MAILER_SOURCE,
              pass: config.MAILER_PWD
            },
            tls: {
              ciphers: "SSLv3"
            }
          });

          let mailOptions = {
            from: config.MAILER_SOURCE,
            to: req.body.email,
            subject: "Your TrackR credentials",
            text: `username: ${req.body.username}\nemail: ${req.body.email}\npassword: ${req.body.password}`
          };

          await db.members.insert(
            {
              username: req.body.username,
              password: req.body.password,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              role: 2,
              owner: req.params.username
            },
            (error, response) => {
              if (error) {
                return res
                  .status(400)
                  .send(`Insertion failed! Reason: ${error.errmsg}`);
              } else {
                transporter.sendMail(mailOptions, function(error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent: " + info.response);
                  }
                });
              }
            }
          );
        }
      );
    } catch (error) {
      res.status(400).send(error);
    }
  });
};
