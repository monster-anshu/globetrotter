import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const QuizCheckZod = z.object({
  alias: z.string(),
  answer: z.string(),
});

export class QuizCheckDto extends createZodDto(QuizCheckZod) {}
