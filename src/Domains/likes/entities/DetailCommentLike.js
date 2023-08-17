class DetailCommentLike {
  constructor(payload) {
    this._verifyPayload(payload);

    const {like} = payload;

    this.like = like;
  }

  _verifyPayload({like}) {
    if (like === undefined) {
      throw new Error('DETAIL_COMMENT_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof like !== 'number') {
      throw new Error('DETAIL_COMMENT_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailCommentLike;
