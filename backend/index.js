const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.EXPRESS_PORT || 5000;
const shoes_model = require("./shoes_model");
const user_model = require("./user_model");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://famous-tiramisu-a4a400.netlify.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  if (req.query.name) {
    shoes_model
      .getSpecificShoeByName(req.query.name)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } else {
    shoes_model
      .getAllShoes()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

app.get("/:id", (req, res) => {
  const number = parseInt(req.params.id);
  if (number) {
    shoes_model
      .getSpecificShoeById(req.params.id)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

app.post("/createUserData", (req, res) => {
  user_model
    .createUserData(req.body.uid)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/ask", (req, res) => {
  user_model
    .setUserAsk(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/bid", (req, res) => {
  user_model
    .setUserBid(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/buy", (req, res) => {
  user_model
    .setUserPurchases(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/sell", (req, res) => {
  user_model
    .setUserSales(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/shipping", (req, res) => {
  user_model
    .setUserShipping(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/deleteBid", (req, res) => {
  user_model
    .deleteUserBid(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/deleteAsk", (req, res) => {
  user_model
    .deleteUserAsk(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.post("/payout", (req, res) => {
  user_model
    .setUserPayout(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/payment", (req, res) => {
  user_model
    .setUserPayment(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/getUserData/:id", (req, res) => {
  user_model
    .getUserData(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
