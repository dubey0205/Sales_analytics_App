const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs'); // Import GraphQL type definitions
const resolvers = require('./graphql/resolvers'); // Import resolvers

// MongoDB connection
mongoose.connect('mongodb+srv://AppTest:Demo%40123@cluster0.tkxu8.mongodb.net/Sales_Analytics_App', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
