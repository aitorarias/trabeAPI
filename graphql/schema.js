const { gql } = require("apollo-server");

const typeDefs = gql`
  enum MovementTypes {
    DEPOSIT
    WITHDRAW
  }

  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
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
    me: User
  }

  type Mutation {
    addDeposit(number: String!, type: MovementTypes!, amount: Int!): Account!
    makeWithdraw(number: String!, type: MovementTypes!, amount: Int!): Account!
    createUser(username: String!): User
    login(username: String!, password: String!): Token
  }
`;

module.exports = typeDefs;
