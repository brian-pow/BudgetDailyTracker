module.exports = {
  Query: {
    totals: (_, __, { dataSources }) =>
      dataSources.GoogleSheetsAPI.getAllTotals(),
    log: (_, __, { dataSources }) =>
    dataSources.LogAPI.getAllItems(),
  },
  Mutation: {
    postExpense: async (_, input, { dataSources }) => {
      const result = await dataSources.GoogleSheetsAPI.postExpense(input)
      const result2 = await dataSources.LogAPI.postItem(input)
      return true;
    }
  },
};

