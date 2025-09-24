import { z } from 'zod';

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
const driveRegex = /^(https?:\/\/)?(drive\.google\.com)\/.+$/;

export const userSchema = z.object({
  team: z.string().trim(),
  school: z
    .string()
    .trim()
    .transform((val) => val.replace(/โรงเรียน/g, '')),
  email: z.email(),
  name1: z.string().trim(),
  name2: z.string().trim(),
  name3: z.string().trim(),
  url: z.string().refine((val) => driveRegex.test(val)),
  clip: z.string().refine((val) => youtubeRegex.test(val)),
  username: z.string().trim(),
  password: z
    .string()
    .refine((val) => /[a-z]/.test(val))
    .refine((val) => /[A-Z]/.test(val))
    .refine((val) => /[0-9]/.test(val)),
});

export type UserInput = z.infer<typeof userSchema>;
