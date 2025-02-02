const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const multer = require("multer");

// File upload folder
const UPLOADS_FOLDER = "./uploads";

// Set disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

// prepare the filam multer upload object
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only .pdf format allowed!"));
      }
    } else {
      cb(new Error("There was an error"));
    }
  },
});

// applicaiton routes

/* 
Multer এর মাধ্যমে,
 একটি ফাইল upload করার জন্য .single() ব্যবহার করতে হয়
 একাধিক ফাইল upload করার জন্য .array() ব্যবহার করতে হয় (এক্ষেত্রে প্রথম argument হিসেবে file input field এর name দিতে হয় এবং দ্বিতীয় argument হিসেবে কতগুলো ফাইল upload করা হবে তার সংখ্যা দিতে হয়)

 একাধিক file upload input field এর জন্য .fields() ব্যবহার করতে হয় (এক্ষেত্রে প্রথম argument হিসেবে একটি array দিতে হয় যেখানে প্রতিটি object এর name হিসেবে file input field এর name দিতে হয় এবং দ্বিতীয় argument হিসেবে কতগুলো ফাইল upload করা হবে তার সংখ্যা দিতে হয়)

 Multer এর সাহায্যে Form Data handle করার জন্য .none() ব্যবহার করতে হয়
*/
app.post(
  "/",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "doc",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    console.log(req.files);
    res.send("Hello World!");
  }
);

// Default Error Handler
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was an upload error!");
    }
    res.status(500).send(err.message);
  } else {
    res.send("Successfully uploaded!");
  }
});

app.listen(port, () => {
  console.log(`Express app is running on port ${port}`);
});
