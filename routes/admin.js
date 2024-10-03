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
   

  productHelpers.addProduct(req.body, (id) => {
    // Check if files and the specific file exist
    if (req.files && req.files.image) {
      let image = req.files.image;
      image.mv('./public/product-images/' + id + '.jpg', (err) => {
        if (!err) {
          res.render("admin/add-product");
        } else {
          console.log(err);
          res.status(500).send('Error uploading image');
        }
      });
    } else {
      // Handle the case where no image was uploaded
      console.log("No image uploaded");
      res.render("admin/add-product");
    }
  })
})

router.get('/delete-product/:id',(req,res)=>{
    let proId= req.params.id
    productHelpers.deleteProduct(proId).then((response)=>{
      res.redirect('/admin/')
    })
})

router.get('/edit-product/:id',async(req,res)=>{
  let product= await productHelpers.getProductDetails(req.params.id)
  console.log(product)
  res.render('admin/edit-product',{product})
  
})

router.post('/edit-product/:id',(req,res)=>{
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin/')
    if(req.files.image){
      let image=req.files.image
      image.mv('./public/product-images/' + id + '.jpg');
    }
  })
})



module.exports = router;
