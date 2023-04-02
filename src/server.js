const express = require("express");
const fs = require('fs');
const multer = require("multer");

const PORT = process.env.PORT || 3001;

const app = express();

const getPosts = () => {
    return fs.readdirSync(`${__dirname}/assignment2/posts`);
}

const getPost = (postName) => {
    //console.log("getPOst:" + postName);
    return fs.readFileSync(`${__dirname}/assignment2/posts/${postName}`);
}

const getPostComments = (postName) => {
  //console.log(postName);
  const filename = postName + ".txt";
  //console.log(filename);
  return fs.readFileSync(`${__dirname}/assignment2/comments/${postName}.txt`);
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

app.get("/post/:postName/comments", (req, res) => {
  //res.writeHead(200);
  const {postName} = req.params;
  const postComments = getPostComments(postName);
  res.json({postComments});
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
    fs.writeFile(`${__dirname}/assignment2/comments/${req.body.postName}.txt`, '', function (err) { 
      if (err) throw err;
      console.log(`File ${req.body.postName}.txt created!`);
    });
    console.log(req.body.postName);
    res.sendStatus(200);
  });

  const commentUpload = multer();
  app.post("/post/:postName/comments", commentUpload.none(), (req, res) => {
    const {postName} = req.params;
    console.log(req.body);
    const comments = req.body.new_comment;
    fs.appendFile(`${__dirname}/assignment2/comments/${postName}.txt`, comments, (err) => {
      if (err) throw err;
      console.log('Data appended to file!');
    });
    res.sendStatus(200);
  })

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
