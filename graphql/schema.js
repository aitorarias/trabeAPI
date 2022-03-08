const { gql } = require("apollo-server");

const typeDefs = gql`
  enum MovementTypes {
    DEPOSIT
    WITHDRAW
  }

  type Account {
    number: String!
    balance: Int!
    deposit: Int!
    withdraw: Int!
    movements: [Movement!]
  }

  type Movement {
    date: String!
    type: MovementTypes!
    amount: Int!
    balance: Int!
  }

  type Query {
    getAccountAndMovements: [Account!]
  }

  type Mutation {
    addDeposit(number: String!, type: MovementTypes!, amount: Int!): Account!
    makeWithdraw(number: String!, type: MovementTypes!, amount: Int!): Account!
  }
`;

module.exports = typeDefs;
