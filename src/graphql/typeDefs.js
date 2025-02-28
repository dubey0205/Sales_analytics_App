const { gql } = require('apollo-server');

const typeDefs = gql`
  type CustomerSpending {
    customerId: ID!
    totalSpent: Float!
    averageOrderValue: Float!
    lastOrderDate: String!
  }

  type TopProduct {
    productId: ID!
    name: String!
    totalSold: Int!
  }

  type CategoryRevenue {
    category: String!
    revenue: Float!
  }

  type SalesAnalytics {
    totalRevenue: Float!
    completedOrders: Int!
    categoryBreakdown: [CategoryRevenue!]!
  }

  type OrderProduct {
    productId: ID!
    quantity: Int!
    priceAtPurchase: Float!
  }

  type Order {
    customerId: ID!
    products: [OrderProduct!]!
    totalAmount: Float!
    orderDate: String!
    status: String!
  }

  type Query {
    getCustomerSpending(customerId: ID!): CustomerSpending
    getTopSellingProducts(limit: Int!): [TopProduct!]!
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics!
  }

  type Mutation {
    placeOrder(customerId: ID!, products: [OrderProductInput!]!): Order!
  }

  input OrderProductInput {
    productId: ID!
    quantity: Int!
    priceAtPurchase: Float!
  }
`;

module.exports = typeDefs;
