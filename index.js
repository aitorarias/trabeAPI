require("dotenv").config();
const { ApolloServer } = require("apollo-server");

const jwt = require("jsonwebtoken");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const users = require("./data/users");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("bearer ")) {
      const token = auth.substring(7);
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await users.find(({ id }) => id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
