import { sequelize } from './models/index.js';

// we have to add all the modals here to initlize them in DB
// import Vendor from './models/vendor.js';



export const startServer = async (port, app) => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connected');
    
    await sequelize.sync({ alter: true });
    console.log('Database synced (tables created/updated)');

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error('DB connection/sync error:', err);
    process.exit(1);
  }
};
