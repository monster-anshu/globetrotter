import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserCreateZod = z.object({
  username: z.string().trim().nonempty().optional(),
});

export class UserCreateDto extends createZodDto(UserCreateZod) {}
