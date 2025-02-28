const { Product } = require('../models/product');
const Customer  = require('../models/customer');
const   Order = require('../models/order');
const { v4: uuidv4 } = require('uuid');

const resolvers = {
  Query: {
    getCustomerSpending: async (_, { customerId }) => {
      const customerOrders = await Order.aggregate([
        { $match: { customerId: customerUuid } },
        {
          $group: {
            _id: "$customerId",
            totalSpent: { $sum: "$totalAmount" },
            avgOrderValue: { $avg: "$totalAmount" },
            lastOrderDate: { $max: "$orderDate" }
          }
        }
      ]);

      if (customerOrders.length === 0) {
        return null;
      }

      const { totalSpent, avgOrderValue, lastOrderDate } = customerOrders[0];
      return {
        customerId,
        totalSpent,
        averageOrderValue: avgOrderValue,
        lastOrderDate
      };
    },

    getTopSellingProducts: async (_, { limit }) => {
      const topSellingProducts = await Order.aggregate([
        { $unwind: "$products" },
        { $group: {
            _id: "$products.productId",
            totalSold: { $sum: "$products.quantity" }
          }
        },
        { $sort: { totalSold: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'productDetails'
          }
        },
        { $unwind: "$productDetails" },
        { $project: {
            productId: "$_id",
            name: "$productDetails.name",
            totalSold: 1
          }
        }
      ]);

      return topSellingProducts;
    },

    getSalesAnalytics: async (_, { startDate, endDate }) => {
      const salesAnalytics = await Order.aggregate([
        { $match: { orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) }, status: 'completed' } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
            completedOrders: { $sum: 1 },
            categoryBreakdown: { $push: { category: "$products.category", revenue: "$totalAmount" } }
          }
        },
        {
          $unwind: "$categoryBreakdown"
        },
        {
          $group: {
            _id: "$categoryBreakdown.category",
            revenue: { $sum: "$categoryBreakdown.revenue" }
          }
        }
      ]);

      return {
        totalRevenue: salesAnalytics[0].totalRevenue,
        completedOrders: salesAnalytics[0].completedOrders,
        categoryBreakdown: salesAnalytics
      };
    }
  },

  Mutation: {
    placeOrder: async (_, { customerId, products }) => {
      const totalAmount = products.reduce((acc, p) => acc + (p.quantity * p.priceAtPurchase), 0);

      const order = new Order({
        customerId: customerId,
        products: products.map(p => ({
          productId: p.productId,
          quantity: p.quantity,
          priceAtPurchase: p.priceAtPurchase
        })),
        totalAmount,
        orderDate: new Date(),
        status: "completed"
      });

      await order.save();
      return order;
    }
  }
};

module.exports = resolvers;
