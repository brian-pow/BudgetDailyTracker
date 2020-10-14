//Require and initialize REST data source
const { RESTDataSource } = require('apollo-datasource-rest');

class GoogleSheetsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_URL;
  }

  //Main function to handle GET requests
  async getAllTotals() {
    const response = await this.get('/');
    return {
      overall: response.overall,
      extra: response.extra,
      fun: response.fun
    }
  }

  //Main function to handle POST requests
  async postExpense(input) {
    let postItem = 
      {
        "index": input.input.index,
        "amount": input.input.amount
      }
    await this.post('/', postItem)
    return true;
  }
  
}

module.exports = GoogleSheetsAPI;