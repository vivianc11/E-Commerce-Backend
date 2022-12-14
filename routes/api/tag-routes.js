const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then((data) => res.json(data))
  .catch((err) => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {id: req.params.id},
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  .then((data) => res.json(data))
  .catch((err) => res.status(500).json(err))
  });

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((data) => res.json(data))
  .catch((err) => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: {id: req.params.id}
  })
  .then((data) => {
    if(!data) {
      res.send.json({message: 'No tag found with this id'})
      return;
    } else {
      res.json(data)
    }
  })
  .catch((err) => {
    res.status(500).json(err);
    console.log(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete({
    where: {id: req.params.id}
  })
  .then((data) => {
    if(!data) {
      res.send.json({message: 'No tag found with this id'})
      return;
    } else {
      res.json(data)
    }
  })
  .catch((err) => {
    res.status(500).json(err);
    console.log(err);
  })
});

module.exports = router;
