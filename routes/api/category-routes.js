const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint



router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});




router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'There is no category by that id.' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/', async (req, res) => {

  try {
    const newCat = await Category.create(req.body)
    if (newCat) {
      return res.status(201).json(newCat)
    }
  } catch (err) {
    return res.status(404).json(err)
  }

});



router.put('/:id', (req, res) => {
  // update a category by its `id` value
});



router.delete('/:id', async (req, res) => {

  try {
    const delId = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!delId) {
      return res.status(200).res.json(delId)
    }

  } catch (err) {

    res.status(500).json(err);

  }
});



module.exports = router;
