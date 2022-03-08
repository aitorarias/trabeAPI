const operations = [
  {
    number: "1",
    balance: 8000,
    deposit: 10500,
    withdraw: 3500,
    movements: [
      {
        date: "01-01-2022",
        type: "DEPOSIT",
        amount: 3500,
        balance: 8000,
      },
      {
        date: "12-10-2021",
        type: "WITHDRAW",
        amount: 500,
        balance: 4500,
      },
      {
        date: "10-6-2021",
        type: "WITHDRAW",
        amount: 2000,
        balance: 5000,
      },
      {
        date: "06-04-2021",
        type: "WITHDRAW",
        amount: 1000,
        balance: 7000,
      },
      {
        date: "10-03-2021",
        type: "DEPOSIT",
        amount: 8000,
        balance: 8000,
      },
    ],
  },
];

module.exports = operations;
