const AddComment = require('../../Domains/comments/entities/AddComment');
const AddedComment = require('../../Domains/comments/entities/AddedComment');

class AddCommentUseCase {
  constructor({commentRepository, threadRepository}) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(payload) {
    const newComment = new AddComment(payload);
    await this._threadRepository.verifyAvailableThread(payload.threadId);
    const result = await this._commentRepository.addComment(newComment);

    return new AddedComment(result);
  }
}

module.exports = AddCommentUseCase;
