import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const sourceSchema = z.object({
  name: z.string().min(1, 'Source name is required').max(100, 'Name too long'),
  url: z.string().url('Please enter a valid URL').refine(url => {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  }, 'Only HTTP/HTTPS URLs are allowed'),
  type: z.enum(['rss', 'website']),
  categoryIds: z.array(z.string().uuid()).optional(),
})

export const noteSchema = z.object({
  content: z.any(), // TipTap JSON content
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed'),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50, 'Name too long'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
})

export const articleUpdateSchema = z.object({
  isRead: z.boolean().optional(),
  isFavorite: z.boolean().optional(),
  readingProgress: z.number().min(0).max(100).optional(),
})

export const feedRefreshSchema = z.object({
  sourceId: z.string().uuid(),
  forceRefresh: z.boolean().default(false),
})