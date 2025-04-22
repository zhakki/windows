const { Toode, Brand } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const tooted = await Toode.findAll({
      include: { model: Brand, foreignKey: 'brand_id' }
    });
    res.json(tooted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const toode = await Toode.findByPk(req.params.id, {
      include: { model: Brand }
    });

    if (!toode) return res.status(404).json({ message: 'Product not found' });

    res.json(toode);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newToode = await Toode.create(req.body);
    res.status(201).json({ message: 'Product created', toode: newToode });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
};
