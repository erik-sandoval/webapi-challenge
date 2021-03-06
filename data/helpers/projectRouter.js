const express = require("express");

const Action = require("./actionModel");
const Project = require("./projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Project.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "cannot retrieve data" });
    });
});

router.get("/:id/actions", validateId, (req, res) => {
  const id = req.params.id;
  Project.getProjectActions(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "cannot retrieve data" });
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  Project.insert(req.body)
    .then(data => {
      res.status(200).json({ message: "project created" });
    })
    .catch(err => {
      res.status(500).json({ message: "something happened" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  Project.remove(id)
    .then(data => {
      res.status(200).json({ message: "project deleted" });
    })
    .catch(err => {
      res.status(500).json({ message: "something happened" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  changes = req.body;
  console.log(id);
  Project.update(id, changes)
    .then(data => {
      res.status(200).json({ message: "project updates" });
    })
    .catch(err => {
      res.status(500).json({ message: "something happened" });
    });
});

function validateId(req, res, next) {
  const id = req.params.id;
  console.log(id);
  Project.get(id)
    .then(data => {
      console.log(data);
      if (data.actions.length > 1) {
        req.action = data;
        next();
      } else {
        res.status(400).json({ message: "project has no actions" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "ID NOT VALID" });
    });
}

module.exports = router;
