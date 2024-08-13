var express = require('express');
var router = express.Router();
const {render}=require('../app');
var productHelpers = require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products',{admin:true,products})
  })

  
});

router.get('/add-product',function(req,res){
  res.render('admin/add-product',{admin:true})
})
router.post('/add-product',(req,res)=>{
   

  productHelpers.addProduct(req.body,(id)=>{
    let image= req.files.image;
    console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
         res.render("admin/add-product")
      }
      else{
        console.log(err);
      }
    })
   
  })
})

router.get('/delete-product/:id',(req,res)=>{
    let proId= req.params.id
    productHelpers.deleteProduct(proId).then((response)=>{
      res.redirect('/admin/')
    })
})

module.exports = router;
