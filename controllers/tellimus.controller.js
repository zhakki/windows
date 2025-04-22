const { Tellimus, Klient, Tootaja, Roll } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { userType, id } = req.user;
    if (userType !== 'klient') return res.status(403).json({ message: 'Only clients can create orders' });

    const newOrder = await Tellimus.create({
      klient_id: id,
      tellimuse_kuupaev: new Date(),
      kuu_arv: 1 // default for now
    });

    res.status(201).json({ message: 'Order created', tellimus_id: newOrder.tellimus_id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    if (req.user.userType !== 'klient') {
      return res.status(403).json({ message: 'Only clients can view their orders' });
    }

    const orders = await Tellimus.findAll({
      where: { klient_id: req.user.id },
      order: [['tellimuse_kuupaev', 'DESC']]
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    if (req.user.roll !== 'Manager' && req.user.roll !== 'SalesManager') {
      return res.status(403).json({ message: 'Only managers can view all orders' });
    }

    const orders = await Tellimus.findAll({ order: [['tellimus_id', 'DESC']] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all orders', error: err.message });
  }
};
