const path = require("path");
const express = require("express");
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();

//define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "amirhossein"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "amirhossein"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    message: "hi this is help page",
    name:'amirhossein'
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error:'No Address is Provided'
    })
  }
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({
        error
      })
    }
    forecast(latitude,longitude,(error,forecastData)=>{
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        address:req.query.address,
        location,
        forecast: forecastData
      });
    })
  })
 
});

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'you must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404 page not found',
    name:'amirhossein',
    _404_Message:'Help Article Not found'
  })
})

app.get('*',(req,res)=>{
    res.render('404',{
      title:'404 page not found',
      name:'amirhossein',
      _404_Message:'Page Not found'
    })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
