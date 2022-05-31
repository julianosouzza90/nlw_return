
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
    console.log(type, comment, screenshot);
    return true;
    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format!')
    }

    if(!type){
      throw new Error('Type is required.')

    }
    if(!comment){
      throw new Error('Comment is required.')
    }

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