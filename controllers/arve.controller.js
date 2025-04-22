const { Arve } = require('../models');

exports.getInvoiceByOrder = async (req, res) => {
  try {
    const { tellimusId } = req.params;

    const invoice = await Arve.findOne({ where: { tellimus_id: tellimusId } });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found for this order' });
    }

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get invoice', error: err.message });
  }
};

exports.payInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { summa } = req.body;

    const invoice = await Arve.findByPk(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    invoice.makse_kuupaev = new Date();
    invoice.summa = summa;

    await invoice.save();

    res.json({ message: 'Invoice paid', invoice });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update invoice', error: err.message });
  }
};
