const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5000;

let config;
if (!process.env.HEROKU) {
  config = require("./config");
} else {
  config = process.env;
}

const jwt = require("jsonwebtoken");

const mongojs = require("mongojs");
const db = mongojs(config.MONGODB_URL);

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use("/", express.static("../frontend/build"));
app.use(express.static("../frontend/build"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  let today = new Date();

  let date =
    today.getDate() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getFullYear() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  console.log(date);
  next();
});

//company router setup
let company_router = express.Router();
require("./routes/company.js")(company_router, db, mongojs, jwt, config);
app.use("/company", company_router);

//tickets router setup
let tickets_router = express.Router();
require("./routes/tickets")(tickets_router, db, mongojs, jwt, config);
app.use("/tickets", tickets_router);

//users router setup
let users_router = express.Router();
require("./routes/users")(users_router, db, mongojs, jwt, config);
app.use("/users", users_router);

/** Swagger setup */
const swaggerDefinition = {
  info: {
    title: "Trackr Swagger API Documentation",
    version: "0.1.0"
  },
  host: config.SWAGGER_HOST,
  basePath: "/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "auth",
      scheme: "bearer",
      in: "header"
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ["./src/api/index.js", "./src/api/routes/*"]
};

const swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/users", (req, res) => {
  db.users.find({}, (err, docs) => {
    res.json(docs);
  });
});

/**
 * @swagger
 * /authenticate:
 *   post:
 *     tags:
 *       - auth
 *     name: login
 *     summary: Logs the user in and returns the user info and token
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: credentials
 *         required: true
 *         schema:
 *             type: object
 *             properties:
 *                 username:
 *                     type: string
 *                     example: kiradon
 *                 password:
 *                     type: string
 *                     example: test
 *                 required:
 *                     - username
 *                     - password
 *     responses:
 *       200:
 *         description: Returns the user information and token
 *       400:
 *           description: Invalid user request.
 *       404:
 *           description: User not found/Wrong credentials.
 *       500:
 *         description: Something is wrong with the service. Please contact the system administrator.
 */
app.post("/authenticate", async (req, res) => {
  console.log("Login route");

  try {
    let jwtToken;
    await db.users.findOne({ username: req.body.username }, (err, doc) => {
      if (!doc) {
        return res.status(403).send({ message: "username" });
      } else if (doc.password != req.body.password) {
        return res.status(403).send({ message: "password" });
      }
      jwtToken = jwt.sign(
        {
          username: doc.username,
          role: doc.role,
          exp: Math.floor(Date.now() / 1000) + 3600 // token which lasts for an hour
        },
        process.env.JWT_SECRET || config.JWT_SECRET
      );

      res.send({ user: doc, jwt: jwtToken });
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//register call
app.post("/registration", async (req, res) => {
  console.log("Register route");

  try {
    await db.users.findOne(
      { username: req.body.username },
      async (err, docs) => {
        if (docs != null) {
          return res.status(400).send("Register failed! User already exists");
        }

        await db.users.insert(
          {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role
          },
          (error, response) => {
            if (error) {
              return res
                .status(400)
                .send(`Insertion failed! Reason: ${error.errmsg}`);
            }
          }
        );
      }
    );
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log("Server listening on port: " + port);
});
