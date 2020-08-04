import express from 'express';
import Product from '../models/productModel.mjs';
import { isAuth, isAdmin } from '../util.mjs';

const router = express.Router();

router.get("/", async (req, res) => {
  const category = req.query.category ? 
                  req.query.category === "botez" ?
                    {category: ["aranamentecristelnita", "lumanari" ]} 
                  :
                  req.query.category === "nunta" ?
                    {category: ["buchetedemireasa" ,"lumanaridecununie" , "aranjamentefloralesala" , "buchetenasa"]}   
                  : 
                  req.query.category === "search" ?
                    {} 
                  :
                  { category: req.query.category}: {};

  const searchKeyword = req.query.searchKeyWord !== "null"
  ? {
      name: {
        $regex: req.query.searchKeyWord,
        $options: 'i',
      },
    }
  : {};
    const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'highest'
      ?  { price: 1 } : 
      req.query.sortOrder ==="lowest" ?
      { price: -1 } 
      : req.query.sortOrder === "az" ?
      {name: 1} :
      req.query.sortOrder === "za" ?
      {name: -1} : { _id: -1 }: { _id: -1};

    const minPrice = req.query.minPrice !== "null" ? {price: {$gte: req.query.minPrice}} : {};
    const maxPrice = req.query.maxPrice !== "null" ? {price: {$lte: req.query.maxPrice}} : {};
    const products = await Product.find({...searchKeyword, ...category, ...minPrice, ...maxPrice}).sort(sortOrder);
    res.send(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
});

router.post("/", isAuth, isAdmin, async(req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        madeOf: req.body.madeOf
    });
    const newProduct = await product.save();
    if(newProduct) {
        return res.status(201).send({message: "New Product Created", data: newProduct});
    }
    return res.status(500).send({message: "Error in creating a new product."});
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.madeOf = req.body.madeOf;
      product.category = req.body.category;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedProduct });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

  router.delete('/:id',isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  });

export default router;