# Sales_analytics_App

The API provides the following GraphQL queries to analyze and retrieve insights related to e-commerce sales:

getCustomerSpending(customerId: ID!): Returns the total spending, average order value, and last purchase date for a specific customer.
getTopSellingProducts(limit: Int!): Returns the top-selling products based on the total quantity sold.
getSalesAnalytics(startDate: String!, endDate: String!): Returns total revenue, completed orders, and revenue breakdown by product category within a given date range.
Additionally, this API uses MongoDB aggregation pipelines for efficient data retrieval and optimizes performance through appropriate indexing.

1. Clone the repository
git clone <repository-url>
cd <project-directory>
2. Install dependencies
3. Set up MongoDB
const mongoURI = `mongodb+srv://AppTest:Demo%40123@cluster0.tkxu8.mongodb.net/Sales_Analytics_App`;

4. Run the Server



API Endpoints

The API exposes the following GraphQL queries:

1. getCustomerSpending(customerId: ID!)
Description:
Returns the total spending, average order value, and last purchase date for a given customer.

Expected Response:
{
  "customerId": "63f8b3d5a7b1d7f3b0a2c5e1",
  "totalSpent": 1500.75,
  "averageOrderValue": 250.12,
  "lastOrderDate": "2024-02-18T10:30:00Z"
}

2. getTopSellingProducts(limit: Int!)
Description:
Returns the top-selling products based on the total quantity sold.

Expected Response:
[
  { "productId": "63f8b3d5a7b1d7f3b0a2c5e5", "name": "Wireless Headphones", "totalSold": 300 },
  { "productId": "63f8b3d5a7b1d7f3b0a2c5e6", "name": "Smartwatch", "totalSold": 250 }
]

3. getSalesAnalytics(startDate: String!, endDate: String!)
Description:
Returns total revenue, number of completed orders, and revenue breakdown by product category within a date range.

Expected Response:
{
  "totalRevenue": 125000.50,
  "completedOrders": 500,
  "categoryBreakdown": [
    { "category": "Electronics", "revenue": 70000.25 },
    { "category": "Fashion", "revenue": 35000.00 }
  ]
}


Sample Queries
You can test the following sample queries in the GraphQL Playground.

Get Customer Spending:
query {
  getCustomerSpending(customerId: "63f8b3d5a7b1d7f3b0a2c5e1") {
    customerId
    totalSpent
    averageOrderValue
    lastOrderDate
  }
}

Get Top Selling Products:
query {
  getTopSellingProducts(limit: 5) {
    productId
    name
    totalSold
  }
}

Get Sales Analytics:
query {
  getSalesAnalytics(startDate: "2024-01-01", endDate: "2024-12-31") {
    totalRevenue
    completedOrders
    categoryBreakdown {
      category
      revenue
    }
  }
}


