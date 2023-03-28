const express = require("express");
const fs = require('fs');
const multer = require("multer");

const PORT = process.env.PORT || 3001;

const app = express();

const getPosts = () => {
    return fs.readdirSync(`${__dirname}/assignment2/posts`);
}

const getPost = (postName) => {
    return fs.readFileSync(`${__dirname}/assignment2/posts/${postName}`);
}

app.get("/posts", (req, res) => {
    const posts = getPosts();
    res.json({ posts });
});

app.get("/post/:postName", (req, res) => {
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    const {postName} = req.params;
    const postData = getPost(postName);
    res.end(postData);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/assignment2/posts`);
    },
    filename: function (req, file, cb) {
      cb(null, req.body.postName); // set the filename to be the original filename
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/post/new", upload.single("image"), (req, res) => {
    res.sendStatus(200);
  });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
