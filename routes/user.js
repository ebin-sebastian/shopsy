var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  let products=[
    {
      name:"Iphone 11",
      category:"mobile",
      description:"good phone",
      price:'140000',
      image:"https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-geo-230912_inline.jpg.large.jpg"

    },
    {
      name:"Samsung S24 Ultra",
      category:"mobile",
      description:"good phone",
      price:'120000',
      image:"/images/samsung s24.webp"

    },
    {
      name:"HTC desire",
      category:"mobile",
      description:"good phone",
      price:'60000',
      image:"https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-geo-230912_inline.jpg.large.jpg"

    },
    {
      name:"Nothing Phone 2",
      category:"mobile",
      description:"good phone",
      price:'40000',
      image:"/images/Nothing-Phone-2.jpg"

    },
  ]
   
  res.render('index', {products, admin:false});
});

module.exports = router;
