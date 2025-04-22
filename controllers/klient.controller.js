const { Klient, Roll } = require('../models');

// 1. Получить текущий профиль клиента
exports.getMyProfile = async (req, res) => {
  try {
    const klientId = req.user.id;
    const userType = req.user.userType;

    if (userType !== 'klient') {
      return res.status(403).json({ message: 'Only clients can access this endpoint' });
    }

    const klient = await Klient.findByPk(klientId, {
      attributes: { exclude: ['parool'] },
      include: { model: Roll, foreignKey: 'roll_id' }
    });

    if (!klient) return res.status(404).json({ message: 'Client not found' });

    res.json(klient);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

// 2. Обновить данные клиента
exports.updateMyProfile = async (req, res) => {
  try {
    const klientId = req.user.id;
    const userType = req.user.userType;

    if (userType !== 'klient') {
      return res.status(403).json({ message: 'Only clients can update their profile' });
    }

    const { nimi, perekonnanimi, telefon, aadress } = req.body;

    const klient = await Klient.findByPk(klientId);
    if (!klient) return res.status(404).json({ message: 'Client not found' });

    klient.nimi = nimi || klient.nimi;
    klient.perekonnanimi = perekonnanimi || klient.perekonnanimi;
    klient.telefon = telefon || klient.telefon;
    klient.aadress = aadress || klient.aadress;

    await klient.save();

    res.json({ message: 'Profile updated', klient });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};
