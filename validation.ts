import { z } from 'zod';

const num = /[0-9]/;
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
const driveRegex = /^(https?:\/\/)?(drive\.google\.com)\/.+$/;
const folderRegex =
  /https:\/\/drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/;

export const userSchema = z.object({
  team: z.string().trim(),
  school: z
    .string()
    .trim()
    .transform((val) => val.replace(/โรงเรียน/g, '')),
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase()),
  call1: z
    .string()
    .trim()
    .refine((val) => num.test(val)),
  call2: z
    .string()
    .trim()
    .refine((val) => num.test(val)),
  name1: z.string().trim(),
  name2: z.string().trim(),
  name3: z.string().trim(),
  name4: z.string().trim(),
  url: z
    .string()
    .url()
    .refine((val) => folderRegex.test(val)),
  clip: z
    .string()
    .url()
    .refine((val) => youtubeRegex.test(val)),
  username: z.string().trim(),
  qi1: z
    .string()
    .url()
    .refine((val) => driveRegex.test(val)),
  qa1: z
    .string()
    .url()
    .refine((val) => driveRegex.test(val)),
  password: z
    .string()
    .refine((val) => /[a-z]/.test(val))
    .refine((val) => /[A-Z]/.test(val))
    .refine((val) => /[0-9]/.test(val)),
});

export type UserInput = z.infer<typeof userSchema>;
