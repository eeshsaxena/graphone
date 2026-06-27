import { z } from 'zod';

// URL validation (spec: "URL validation on POST inputs"). Requires a real
// http(s) URL, not just any string.
const httpUrl = z
  .string()
  .url()
  .refine((u) => /^https?:\/\//i.test(u), 'Must be an http(s) URL');

export const createCompanySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  category: z.string().min(1).max(80),
  website: httpUrl,
  logo_url: httpUrl.optional(),
  funding_total: z.number().nonnegative().default(0),
  employee_count: z.number().int().nonnegative().default(0),
  founded_year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  hq_city: z.string().min(1).max(120),
  hq_country: z.string().min(1).max(120),
  stage: z.string().min(1).max(40).default('Seed'),
  is_unicorn: z.boolean().default(false),
  valuation: z.number().nonnegative().default(0),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;

export const claimCompanySchema = z.object({
  claimant_name: z.string().min(1).max(160),
  claimant_email: z.string().email(),
  role: z.string().min(1).max(120),
  proof_url: httpUrl.optional(),
  message: z.string().max(1000).optional(),
});

export type ClaimCompanyInput = z.infer<typeof claimCompanySchema>;
