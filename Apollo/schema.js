const { gql } = require('apollo-server');

const typeDefs = gql`
  type Totals {
    overall: Int,
    extra: Int,
    fun: Int
  }

  type LogQuery {
    amount: Float
    date: String
    name: String
    type: String
  }

  type Query {
    totals: Totals
    log: [LogQuery]
  }

  type Mutation {
    postExpense(input: itemToPost): Boolean
  }

  input itemToPost {
    index: Int
    amount: Float
    type: String
    name: String
  }
`;

module.exports = typeDefs;