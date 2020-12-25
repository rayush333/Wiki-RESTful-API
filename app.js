const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const lodash=require('lodash');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static('public'));
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/wikiDB',{useNewUrlParser: true, useUnifiedTopology: true});
const articleSchema=new mongoose.Schema({
  title: String,
  content: String
});
const Article=mongoose.model('Article',articleSchema);
app.route("/articles")
.get(function(req,res){
  Article.find({},function(err,articles){
    if(err)
    res.send(err);
    else
    res.send(articles);
  });
})
.post(function(req,res){
  const article=new Article(req.body);
  article.save(function(err){
    if(err)
    res.send(err);
    else
    res.send("Post success");
  });
})
.delete(function(req,res){
  Article.deleteMany({},function(err){
    if(err)
    res.send(err);
    else
    res.send("All articles deleted");
  });
});


app.route("/articles/:title")

.get(function(req,res){
  Article.findOne({title: req.params.title},function(err,article){
    if(err)
    res.send(err);
    else
    res.send(article);
  });
})

.put(function(req,res){
  Article.replaceOne({title: req.params.title},req.body,function(err){
    if(err)
    res.send(err);
    else
    res.send("Put successful");
  });
})
.patch(function(req,res){
  Article.updateOne({title: req.params.title},req.body,function(err){
    if(err)
    res.send(err);
    else
    res.send("Patch successful");
  });
})
.delete(function(req,res){
  Article.deleteOne({title: req.params.title},function(err){
    if(err)
    res.send(err);
    else
    res.send("delete successful");
  });
});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server running");
});
