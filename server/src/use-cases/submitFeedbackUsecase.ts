
import { MailAdapter } from '../adapters/mailAdapter';
import {FeedbacksRepository} from '../repositories/feedbacksRepository';

interface SubmitFeedbackUsecaseRequest{
  type: string;
  comment: string;
  screenshot?: string;
}


export class SubmitFeedbackUsecase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
    ) {}
  async execute(request: SubmitFeedbackUsecaseRequest) {
    const { type, comment, screenshot } = request; 

    await this.feedbacksRepository.create(
      {
        type,
        comment,
        screenshot
      }
    )

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size:16px; color: #222;">`,
          `<p>Tipo do feedback: ${type}</p>`,
          `<p>Comentário: ${comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}