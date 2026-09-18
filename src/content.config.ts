import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const missions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/missions' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.string(),
    statusTone: z.enum(['green', 'blue', 'gold']),
    icon: z.enum(['satellite', 'rocket', 'star']),
    order: z.number(),
    vehicle: z.string(),
    missionWindow: z.string(),
    destination: z.string(),
    coverImage: z.string().default('/images/lab-research.svg'),
  }),
});

const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    label: z.string(),
    publishedAt: z.coerce.date(),
    image: z.string().default('/images/lab-evidence.svg'),
    spectrumBars: z.array(z.number().int().min(0).max(100)).length(12),
    rangeStart: z.string(),
    rangeEnd: z.string(),
    highlight: z.string(),
  }),
});

const departures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/departures' }),
  schema: z.object({
    title: z.string(),
    detail: z.string(),
    date: z.string(),
    time: z.string(),
    image: z.string().default('/images/lab-schedule.svg'),
    stage: z.string(),
    order: z.number(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string(),
    desk: z.string(),
    image: z.string().default('/images/lab-news.svg'),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    topic: z.string(),
    level: z.string(),
    publishedAt: z.coerce.date(),
    keywords: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    eyebrow: z.string(),
    image: z.string().default('/images/lab-research.svg'),
    highlights: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ).default([]),
  }),
});

export const collections = {
  missions,
  reports,
  departures,
  news,
  notes,
  pages,
};
