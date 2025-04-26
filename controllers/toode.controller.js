const { Toode, Brand } = require('../models');


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

// Все товары 

exports.getAllTooted = async (req, res) => {
  try {
    const tooted = await Toode.findAll({
      include: { model: Brand, foreignKey: 'brand_id' }
    });
    res.json(tooted);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении товаров', error: err.message });
  }
};


// Обновление товара
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const toode = await Toode.findByPk(id);
    if (!toode) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await toode.update(updateData);

    res.json({
      message: 'Product updated successfully',
      toode
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
};


// удалить товары
exports.delete = async (req, res) => {
  try {
    const toodeId = req.params.id;
    const deleted = await Toode.destroy({ where: { toode_id: toodeId } });

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
};
