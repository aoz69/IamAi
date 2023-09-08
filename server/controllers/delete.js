
const { userModel, productModel, categoryModel } = require('../models/dbModel');

async function deleteResource(resourceType, resourceId) {
  try {
    let Model;
    switch (resourceType) {
      case 'product':
        Model = productModel;
        break;
      case 'category':
        Model = categoryModel;
        break;
      case 'user':
        Model = userModel;
        break;
      default:
        throw new Error('Invalid resource type');
    }

    const deletedResource = await Model.findByIdAndDelete(resourceId);
    if (!deletedResource) {
      throw new Error(`Data not found`);
    }

    return { success: true, message: `Deleted successfully` };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = { deleteResource };
