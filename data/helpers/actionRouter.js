const express = require("express");

const Action = require("./actionModel");
const Project = require("./projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Action.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get data" });
    });
});

router.post("/:id", validateId, (req, res) => {
  const action = {
    project_id: req.action.project_id
  };

  Action.insert(action)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get data" });
    });
});

router.put("/:id", validateId, (req, res) => {
  const id = req.action.id;
  changes = req.body;
  console.log(changes);
  Action.update(id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "could not get data" });
    });
});

router.delete("/:id", validateId, (req, res) => {
  const id = req.action.id;
  Action.remove(id)
    .then(data => {
      res.status(201).json({ message: "deleted successfully" });
    })
    .catch(err => {
      res.status(500).json({ message: "could not get data" });
    });
});

// CUSTOM MIDDLEWARE

function validateId(req, res, next) {
  const id = req.params.id;
  Action.get(id)
    .then(data => {
      req.action = data;
      next();
    })
    .catch(err => {
      res.status(500).json({ message: "ID NOT VALID" });
    });
}

module.exports = router;
