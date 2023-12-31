const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});



router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'There is no tag by that id.' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    if (newTag) {
      return res.status(201).json(newTag)
    }
  } catch (err) {
    return res.status(404).json(err)
  }
});



router.put('/:id', async (req, res) => {
  try {
    const up =  await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(up)
    } catch (err) {
      res.status(500).json(err);
    }
});



router.delete('/:id', async (req, res) => {
  try {
    const delId = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (delId) {
      
      return res.status(200).json({delId});
    } else {
      
      return res.status(404).json({ message: 'Row not found' });
    }
  } catch (err) {
    
    res.status(500).json(err);
  }
});

module.exports = router;
