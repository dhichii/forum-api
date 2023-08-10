class DeleteCommentUseCase {
  constructor({commentRepository}) {
    this._commentRepository = commentRepository;
  }

  async execute(payload) {
    const {threadId, commentId, userId} = payload;
    await this._commentRepository
        .verifyAvailableCommentInThread(commentId, threadId);
    await this._commentRepository.verifyCommentOwner(commentId, userId);
    await this._commentRepository.deleteCommentById(commentId);
  }
}

module.exports = DeleteCommentUseCase;
