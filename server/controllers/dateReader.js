const cron = require('node-cron');
const Product = require('../models/dbModel'); // Replace with your actual import path

// Schedule the task to run every day at a specific time (adjust as needed)
cron.schedule('0 0 * * *', async () => {
  const thresholdDate = new Date(); // Current date
  thresholdDate.setDate(thresholdDate.getDate() - 7); // Example: Archive products older than 7 days

  try {
    // Find products with a date exceeding the threshold
    const productsToArchive = await Product.find({
      date: { $lt: thresholdDate },
      status: { $ne: 'archived' }, // Avoid archiving the same product multiple times
    });

    // Update the status to "archived" for the products
    for (const product of productsToArchive) {
      product.status = 'archived';
      await product.save();
    }

    console.log(`${productsToArchive.length} products archived.`);
  } catch (error) {
    console.error('Error archiving products:', error);
  }
});
