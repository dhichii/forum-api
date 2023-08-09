const AddThread = require('../../Domains/threads/entities/AddThread');
const AddedThread = require('../../Domains/threads/entities/AddedThread');

class AddThreadUseCase {
  constructor({threadRepository}) {
    this._threadRepository = threadRepository;
  }

  async execute(payload) {
    const newThread = new AddThread(payload);
    const result = await this._threadRepository.addThread(newThread);

    return new AddedThread(result);
  }
}

module.exports = AddThreadUseCase;
