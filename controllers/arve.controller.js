const { Arve, Tellimus, Klient } = require('../models');

// ✅ Клиент получает счёт по заказу
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

// ✅ Клиент оплачивает счёт
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

// ✅ Менеджер/продавец видит все счета
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Arve.findAll({ order: [['arve_id', 'DESC']] });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch invoices', error: err.message });
  }
};

// ✅ Менеджер/продавец видит счета по заказу
exports.getInvoicesByOrderForManager = async (req, res) => {
  try {
    const { tellimusId } = req.params;

    const invoices = await Arve.findAll({
      where: { tellimus_id: tellimusId },
      include: [
        {
          model: Tellimus,
          include: [{ model: Klient, attributes: ['nimi', 'email'] }]
        }
      ],
      order: [['makse_kuupaev', 'DESC']]
    });

    if (!invoices.length) {
      return res.status(404).json({ message: 'No invoices found for this order' });
    }

    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get invoices for order', error: err.message });
  }
};
