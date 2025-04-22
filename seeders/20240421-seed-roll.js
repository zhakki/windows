'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      { tableName: 'roll', schema: 'windows_sale' },
      [
        {
          roll_id: 1,
          roll_nimi: 'Manager',
          roll_description: 'Full overview of all orders, statuses, reports, user rights management'
        },
        {
          roll_id: 2,
          roll_nimi: 'SalesManager',
          roll_description: 'Registers clients, edits orders, follows status, handles messages'
        },
        {
          roll_id: 3,
          roll_nimi: 'Installer',
          roll_description: 'Schedules installations, updates status, adds installation feedback'
        },
        {
          roll_id: 4,
          roll_nimi: 'Measurer',
          roll_description: 'Inputs window measurements, sends data to sales manager'
        },
        {
          roll_id: 5,
          roll_nimi: 'Client',
          roll_description: 'Places orders, checks status, pays, confirms installation, sends messages'
        },
        {
          roll_id: 6,
          roll_nimi: 'Owner',
          roll_description: 'View statistics, analytics, and sales reports'
        }
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'roll', schema: 'windows_sale' }, null, {});
  }
};
