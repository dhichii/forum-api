const DetailCommentLike = require('../DetailCommentLike');

describe('a DetailCommentLike entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {};

    expect(() => new DetailCommentLike(payload))
        .toThrowError('DETAIL_COMMENT_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type spec', () => {
    const payload = {
      like: 'x',
    };

    expect(() => new DetailCommentLike(payload))
        .toThrowError('DETAIL_COMMENT_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload did not meet data type spec', () => {
    const payload = {
      like: 0,
    };

    const {like} = new DetailCommentLike(payload);

    expect(like).toEqual(payload.like);
  });
});
