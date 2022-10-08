const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then((data) => {
    // If there is no data
    if(!data) {
      console.log('No categories found');
      res.send.json({message: 'No categories found'})
      return;
    } else {
      // present the data
      res.json(data);
    }
  })
  .catch((err) => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {id: req.params.id},
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then((data) => {
    if(!data) {
      console.log('No categories found');
      res.send.json({message: 'No categories found'})
    } else {
      res.json(data)
    }
  })
  .catch((err) => console.log(err))
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then((data) => res.json(data))
  .catch((err) => console.log(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: {id: req.params.id}
  })
  .then((data) => {
    if(!data) {
      console.log('No categories found');
      res.send.json({message: 'No categories found'})
    } else {
      res.json(data)
    }
  })
  .catch((err) => console.log(err))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id}
  })
  .then((data) => {
    if(!data){
      res.send.json({message: 'No category found with this id'})
      return;
    } else {
      res.json(data)
    }
  })
  .catch((err) => {
    res.status(400).json(err);
    console.log(err)
  })
});

module.exports = router;
