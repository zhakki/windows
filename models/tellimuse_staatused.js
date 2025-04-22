const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TellimuseStaatused = sequelize.define('TellimuseStaatused', {
  tellimuse_staatused_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tellimus_id: {
    type: DataTypes.INTEGER,
    staatus: DataTypes.ENUM('esitatud', 'kinnitatud', 'moodetud', 'valmistamisel', 'paigaldatud', 'taidetud', 'lopetatud', 'tuhistatud'),
    kuupaev: DataTypes.DATE
  }, 
}, {
  tableName: 'tellimuse_staatused',
  schema: 'windows_sale',
  timestamps: false
});

module.exports = TellimuseStaatused;
