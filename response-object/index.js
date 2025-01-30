const ejs = require("ejs");
const express = require("express");
const app = express();
const port = 3000;

// Setting ejs as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  // Render the about.ejs file
  // .ejs ফাইল এ ডাটা পাঠাতে হলে নিচের মত করে (2nd প্যারামিটার হিসেবে একটা অবজেক্ট এর মধ্যে) পাঠাতে হবে
  res.render("pages/about", {
    title: "About Page",
    message: "This is the about page",
  });

  res.json({
    name: "John Doe",
  }); // JSON টাইপ ডাটা রেস্পন্স দেয়ার জন্য .json() ব্যবহার করা হয় (অটোমেটিক header এ "Content-Type: application/json" সেট হয়ে যাবে)

  // রেস্পন্স সট্যাটাস সেট করার জন্য ব্যবহার করা হয় (এক্ষেত্রে আলাদা করে res.end() ব্যবহার করে রেস্পন্স end করতে হবে)
  res.status();

  // res.status() এর মতই কিন্তু এক্ষেত্রে আলাদা করে res.end() ব্যবহার করে রেস্পন্স end করতে হবে না
  res.sendStatus(200);

  //   res.format() content-negotiation করে request header এ যে ধরনের কন্টেন্ট "Accept" এ উল্লেখ আছে ঠিক সেভাবে কন্টেন্ট পাঠিয়ে দেয়
  res.format({
    "text/plain": () => {
      res.send("Hello World!"); // যদি request এর "Accept" header এ anything (*/*) থাকে তাহলে এই প্রথম কন্টেন্ট পাঠিয়ে দেয়
    },
    "text/html": () => {
      res.send("<h1>Hello World!</h1>");
    },
    "application/json": () => {
      res.json({ message: "Hello World!" });
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    },
  });

  // কুকি সেট করার জন্য .cookie() ব্যবহার করা হয় (এক্ষেত্রে আলাদা করে res.end() ব্যবহার করে রেস্পন্স end করতে হবে)
  res.cookie("name", "akmtasdikulislam");

  // রেডারেক্ট করার জন্য .redirect() ব্যবহার করা হয় (এক্ষেত্রে আলাদা করে res.end() ব্যবহার করে রেস্পন্স end করতে হবে)
  res.redirect("/test");

  // রেস্পন্স হেডার সেট করার জন্য .set() ব্যবহার করা হয় (এক্ষেত্রে আলাদা করে res.end() ব্যবহার করে রেস্পন্স end করতে হবে)
  res.set("Title", "My Title");

  // রেস্পন্স হেডার গেট করার জন্য .get() ব্যবহার করা হয় (এক্ষেত্রে আলাদা করে res.end() ব্যবহার করে রেস্পন্স end করতে হবে)
  res.get("Title");

  // ডাটা সহ রেস্পন্স দেয়ার জন্য .send() ব্যবহার করা হয়
  res.send("About");
  // ডাটা ছাড়া রেস্পন্স দেয়ার জন্য .send() ব্যবহার করা হয়
  res.end();
});

app.get("/test", (req, res) => {
  res.send("Test");
});

app.listen(port, () => {
  console.log(`This app listening on port ${port}`);
});
