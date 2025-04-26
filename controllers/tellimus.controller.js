const { Tellimus, Klient, Tootaja, TellimuseStaatused, Arve, ToodeteList, TeenusedList, Toode, Teenused,ToodeHinnad } = require('../models');

exports.createOrder = async (req, res) => {
  const { kuu_arv, tooted = [], teenused = [] } = req.body;
  const klient_id = req.user.id;

  try {
    const newOrder = await Tellimus.create({
      klient_id,
      kuu_arv,
      tellimuse_kuupaev: new Date()
    });

    let totalSum = 0;

    // Добавление товаров и расчёт суммы
    for (const item of tooted) {
      const latestHind = await ToodeHinnad.findOne({
        where: { toode_id: item.toode_id },
        order: [['kuupaev', 'DESC']]
      });

      if (!latestHind) continue;

      totalSum += parseFloat(latestHind.hind) * item.arv;


      await ToodeteList.create({
        tellimus_id: newOrder.tellimus_id,
        toode_id: item.toode_id,
        arv: item.arv
      });
    }

    // Добавление услуг и расчёт суммы
    for (const service of teenused) {
      const teenus = await Teenused.findByPk(service.teenused_id);
      if (!teenus) continue;

      totalSum += parseFloat(teenus.hind) * service.arv;

      await TeenusedList.create({
        tellimus_id: newOrder.tellimus_id,
        teenused_id: service.teenused_id,
        arv: service.arv
      });
    }

    // Создание счёта с рассчитанной суммой
    await Arve.create({
      tellimus_id: newOrder.tellimus_id,
      summa: totalSum
    });

    res.status(201).json({
      message: 'Заказ и счёт успешно созданы',
      tellimus_id: newOrder.tellimus_id,
      summa: totalSum.toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при создании заказа', error: err.message });
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

// получение заказа по tellimus_id

// для менеджеров и продавцов — отображаются все детали заказа

// для клиента — только его собственный заказ, с проверкой


exports.getOrderById = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Tellimus.findByPk(id, {
      include: [
        { model: Klient, attributes: ['nimi', 'email'] },
        { model: Tootaja, attributes: ['nimi', 'email'] },
        { model: TellimuseStaatused },
        {
          model: Arve,
          attributes: ['arve_id', 'makse_kuupaev', 'summa']
        },
        {
          model: ToodeteList,
          include: [{ model: Toode, attributes: ['nimetus', 'tuup'] }]
        },
        {
          model: TeenusedList,
          include: [{ model: Teenused, attributes: ['nimetus', 'hind'] }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    //  Проверка прав
    if (req.user.userType === 'klient' && order.klient_id !== req.user.id) {
      return res.status(403).json({ message: 'Нет доступа к этому заказу' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении заказа', error: err.message });
  }
};


// Менеджер назначает исполнителя на заказ
exports.assignWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const { tootaja_id } = req.body;

    const tellimus = await Tellimus.findByPk(id);
    if (!tellimus) {
      return res.status(404).json({ message: 'Order not found' });
    }

    tellimus.tootaja_id = tootaja_id;
    await tellimus.save();

    res.json({ message: 'Worker assigned to order', tellimus });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign worker', error: err.message });
  }
};
