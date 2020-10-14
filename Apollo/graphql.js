const { ApolloServer, gql } = require('apollo-server-lambda');

//Call environment variables
require('dotenv').config()

//This code exists for testing on local server
// const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

//Google Sheets API
const GoogleSheetsAPI = require('./datasources/googleSheets');

const LogAPI = require('./datasources/dynamo');

//Create server object
const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  dataSources: () => ({
    GoogleSheetsAPI: new GoogleSheetsAPI(),
    LogAPI: new LogAPI(),
  })
});

//This code exists for testing on local server
// server.listen().then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
//   });

//Export server object and allow CORS
exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
