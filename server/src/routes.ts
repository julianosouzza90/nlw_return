
import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';

import { PrismaFeedbacksRepository } from './repositories/PrismaFeedbacksRepository';
import { SubmitFeedbackUsecase } from './use-cases/submitFeedbackUsecase';

export const routes = express.Router();


routes.post('/feedbacks', async (req, res) => {
const {type, comment, screenshot} = req.body;

const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
const nodemailerMailAdapter = new NodemailerMailAdapter();

const submitFeedbackUseCase = new SubmitFeedbackUsecase(
  prismaFeedbacksRepository,
  nodemailerMailAdapter 
);

await submitFeedbackUseCase.execute({
  type,
  comment,
  screenshot
})
 
  res.status(201).send();
})
