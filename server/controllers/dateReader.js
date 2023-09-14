const cron = require('node-cron');
const dbModel = require('../models/dbModel');


const scheduledTask = async () => {
    console.log('Scheduled task running...');
    const thresholdDate = new Date(); // Current date
    console.log(thresholdDate);

    thresholdDate.setDate(thresholdDate.getDate() - 7); // Example: Archive products older than 7 days
  
    try {
      const productsToArchive = await dbModel.productModel.find({
        date: { $lt: thresholdDate },
      });

      for (const product of productsToArchive) {
        console.log('Products to archive:', productsToArchive);
        product.status = "archived";
        await product.save();
      } 
    } catch (error) {
      console.log('ERROR'); 
      console.error('Error archiving products:', error);
    }
  };
  
  cron.schedule('* * * * *', scheduledTask);
  
  module.exports = { scheduledTask };