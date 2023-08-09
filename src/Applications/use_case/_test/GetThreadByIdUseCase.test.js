const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository =
    require('../../../Domains/comments/CommentRepository');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const GetThreadByIdUseCase = require('../GetThreadByIdUseCase');

describe('GetThreadByIdUseCase', () => {
  it('should orchestrating the get thread by id action correctly', async () => {
    const useCasePayload = {id: 'thread-123'};
    const currentDate = new Date().toISOString();
    const expectedThread = new DetailThread({
      id: 'thread-123',
      title: 'some thread',
      body: 'anything',
      date: currentDate,
      username: 'dicoding',
    });

    const expectedComments = [
      {
        id: 'comment-123',
        username: 'dicoding',
        date: currentDate,
        content: 'x',
        is_deleted: false,
      },
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.getThreadById = jest.fn()
        .mockImplementation(() => Promise.resolve(
            new DetailThread({
              id: 'thread-123',
              title: 'some thread',
              body: 'anything',
              date: currentDate,
              username: 'dicoding',
            }),
        ));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
        .mockImplementation(() => Promise.resolve(
            [{
              id: 'comment-123',
              username: 'dicoding',
              date: currentDate,
              content: 'x',
              is_deleted: false,
            }],
        ));

    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const thread = await getThreadByIdUseCase.execute(useCasePayload.id);

    expect(thread).toStrictEqual({
      ...expectedThread,
      comments: expectedComments,
    });
    expect(mockThreadRepository.getThreadById)
        .toBeCalledWith(useCasePayload.id);
    expect(mockCommentRepository.getCommentsByThreadId)
        .toBeCalledWith(useCasePayload.id);
  });
});
