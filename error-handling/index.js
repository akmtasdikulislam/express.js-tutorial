const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");

/*
Sync Coder এর ক্ষেত্রে Error Handling

app.get("/", (req, res) => {
  res.send(a);
});

// 404 error handler (router কোন route এর সাথে match করাতে না পারলে শেষ পর্যন্ত এই error handler কল করবে)
app.use((req, res, next) => {
//   res.status(404).send("Not Found");
  next("Requested URL not found"); // এর মাধ্যমে আমরা পরের middleware এর কাছে message সহ error handle করার জন্য পাঠাতে পারি
});

// Override the default express error handler (it has to be last middleware function)
app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).send(err.message);
  }
  res.status(500).send("Something broke!");
});

*/

/*
Async Coder এর ক্ষেত্রে Error Handling

*/

app.get("/", (req, res, next) => {
  //   res.send("Hello World");
  fs.readFile("/file-does-not-exist", (err, data) => {
    if (err) {
      next(err); // next() এর মধ্যে কিছু দেয়া মানেই তা Error Handler কল করবে।
    } else {
      res.send(data);
    }
  });
});

// Middleware chain করার মাধ্যমে error handling

app.get("/a", [
  (req, res, next) => {
    fs.readFile("/file-does-not-exist", "utf-8", (err, data) => {
      console.log(data);
      next(err);
    });
  },
  (req, res, next) => {
    console.log(data.property);
  },
]);

// Custom Default Error Handler
app.use((err, req, res, next) => {
  if (res.headerSent) {
    next("There was a problem");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("Something broke!");
    }
  }
});

app.listen(port, () => {
  console.log(`This app listening on port ${port}`);
});
