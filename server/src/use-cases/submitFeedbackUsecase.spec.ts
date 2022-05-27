import { SubmitFeedbackUsecase } from "./submitFeedbackUsecase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUsecase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy},
);

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64,1wasdsdsdsdsdsdsdsdsdds',

    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
    
  });

  it('should not be  able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64,1wasdsdsdsdsdsdsdsdsdds',

    })).rejects.toThrow();
  });

  it('should not be  able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: '',
      screenshot: 'data:image/png;base64,1wasdsdsdsdsdsdsdsdsdds',

    })).rejects.toThrow();
  })

  it('should not be  able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: 'tudo bugado',
      screenshot: 'teste.jpg',

    })).rejects.toThrow();
  })
})