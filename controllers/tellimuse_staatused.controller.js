const { TellimuseStaatused } = require('../models');

exports.addStatus = async (req, res) => {
  try {
    const { tellimus_id, staatus } = req.body;

    const newStatus = await TellimuseStaatused.create({
      tellimus_id,
      staatus,
      kuupaev: new Date()
    });

    res.status(201).json({ message: 'Status added', id: newStatus.tellimuse_staatused_id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add status', error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await TellimuseStaatused.findAll({
      where: { tellimus_id: id },
      order: [['kuupaev', 'DESC']]
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch status history', error: err.message });
  }
};
