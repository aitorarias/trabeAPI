const { gql, UserInputError } = require("apollo-server");
const operations = require("../data/operations");

const resolvers = {
  Query: {
    getAccountAndMovements: () => operations,
  },
  Mutation: {
    addDeposit: (_, args) => {
      const { number, type, amount } = args;
      const findNumberAccount = operations
        .map((operation) => operation.number)
        .join();
      const getActualDeposit = parseInt(
        operations.map((operation) => operation.deposit)
      );
      if (findNumberAccount !== number) {
        throw new UserInputError("Account number does not match", {
          invalidArgs: number,
        });
      }
      if (type !== "DEPOSIT") {
        throw new UserInputError("Only deposit type operations are allowed", {
          invalidArgs: type,
        });
      }
      if (Math.sign(amount) === -1) {
        throw new UserInputError(
          "Negative numbers are not allowed in deposit type operations",
          {
            invalidArgs: amount,
          }
        );
      }
      const newBalance =
        parseInt(operations.map((operation) => operation.balance)) + amount;
      const operation = operations[0];
      const newMovement = {
        date: new Date(),
        type,
        amount,
        balance: newBalance,
      };
      operation.movements.unshift(newMovement);
      const updateOperation = {
        ...operation,
        balance: newBalance,
        deposit: getActualDeposit + amount,
      };
      operations[0] = updateOperation;
      return updateOperation;
    },
    makeWithdraw: (_, args) => {
      const { number, type, amount } = args;
      const findNumberAccount = operations
        .map((operation) => operation.number)
        .join();
      const getActualWithdraw = parseInt(
        operations.map((operation) => operation.withdraw)
      );
      if (findNumberAccount !== number) {
        throw new UserInputError("Account number does not match", {
          invalidArgs: number,
        });
      }
      if (type !== "WITHDRAW") {
        throw new UserInputError("Only deposit type operations are allowed", {
          invalidArgs: type,
        });
      }
      if (Math.sign(amount) === -1) {
        throw new UserInputError(
          "Negative numbers are not allowed in withdraw type operations",
          {
            invalidArgs: amount,
          }
        );
      }
      const newBalance =
        parseInt(operations.map((operation) => operation.balance)) - amount;
      if (newBalance < 0) {
        throw new UserInputError(
          "You owe money to the bank. You cannot have a negative balance."
        );
      }
      const operation = operations[0];
      const newMovement = {
        date: new Date(),
        type,
        amount,
        balance: newBalance,
      };
      operation.movements.unshift(newMovement);
      const updateOperation = {
        ...operation,
        balance: newBalance,
        withdraw: getActualWithdraw + amount,
      };
      operations[0] = updateOperation;
      return updateOperation;
    },
  },
};

module.exports = resolvers;
