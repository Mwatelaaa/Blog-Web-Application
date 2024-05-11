import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render('about.ejs')
});

app.get("/contact", (req, res) => {
  res.render('contact.ejs')
});

app.get("/compose", (req, res) => {
  res.render('compose.ejs')
});

app.post("/compose", (req, res) => {
  //{postTitle: req.body.postTitle, postBody: req.body.postBody}
  const post = new Post({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  })
  post.save(err => {
    if(!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", (req, res) => {
  const requestedId = _.toString(req.params.postId);
  Post.findOne({_id: requestedId}, (err, post) => {
    res.render('post', {postTitle: post.postTitle, postBody: post.postBody})
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

