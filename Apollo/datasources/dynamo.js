const { RESTDataSource } = require('apollo-datasource-rest');

class LogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.DYNAMO_URL;
  }

  //Main function to handle GET requests
  async getAllItems() {
    const response = await this.get('scan');
    return Array.isArray(response.items)
      ? response.items.map(item => this.itemReducer(item))
      : [];
  }

  //GET reducer
  itemReducer(item) {
    return {
      amount: item.amount || null,
      name: item.name || null,
      date: item.submittedAt || null,
      type: item.type || null
    };
  }

  //Main function to handle POST requests
  async postItem(input) {
    let postItem = {
      "type": input.input.type,
      "name": input.input.name,
      "amount": input.input.amount,
    }
    await this.post('post', postItem)
    return true;
  }
}

module.exports = LogAPI;