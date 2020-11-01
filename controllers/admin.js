const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
  res.render('admin/edit-product', {pageTitle:'Add Product', path:'/admin/add-product', editing:false});
};


exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('admin/products', {
      pageTitle:'Admin Products', 
      path:'/admin/products', 
      prods:rows
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product.save()
  .then(() => {
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {        // all these will not work
  const editMod = req.query.edit;
  if (!editMod) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: product.title,
      path:'edit-product',
      editing:true,
      product:product
    });
  });
};

exports.postEditProduct = (req, res, next) => {         // all these codes won't work
    const updatedId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(updatedId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {       // all these codes won't work
  prodId = req.body.productId;
  Product.deleteSpecificProduct(prodId);
  res.redirect('/admin/products');
};