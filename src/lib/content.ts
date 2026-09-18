import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

import type {
  DiscoveryContent,
  LaunchRowProps,
  MissionCardProps,
  NextDepartureContent,
  SpectrumBarProps,
} from '../data/site';
import { formatReadingTime } from './format';

export type MissionEntry = CollectionEntry<'missions'>;
export type ReportEntry = CollectionEntry<'reports'>;
export type DepartureEntry = CollectionEntry<'departures'>;
export type NoteEntry = CollectionEntry<'notes'>;
export type PageEntry = CollectionEntry<'pages'>;
export type SingletonPageId = 'about' | 'science' | 'technology';

export function estimateReadingTime(body: string) {
  const chineseCharacters = (body.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const latinWords = body.replace(/[\u4e00-\u9fff]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil((chineseCharacters / 420) + (latinWords / 200)));
}

export function getReadingTimeLabel(body?: string) {
  return formatReadingTime(estimateReadingTime(body ?? ''));
}

export async function getMissionEntries() {
  const entries = await getCollection('missions');
  return entries.sort((left, right) => left.data.order - right.data.order);
}

export async function getReportEntries() {
  const entries = await getCollection('reports');
  return entries.sort((left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime());
}

export async function getDepartureEntries() {
  const entries = await getCollection('departures');
  return entries.sort((left, right) => left.data.order - right.data.order);
}

export async function getPageEntry(id: SingletonPageId) {
  const entry = await getEntry('pages', id);
  if (!entry) {
    throw new Error(`Missing singleton page content for ${id}`);
  }
  return entry;
}

export function toMissionCard(entry: MissionEntry): MissionCardProps {
  return {
    title: entry.data.title,
    description: entry.data.summary,
    status: entry.data.status,
    statusTone: entry.data.statusTone,
    icon: entry.data.icon,
    href: `/missions/${entry.id}/`,
  };
}

export function toDiscoveryContent(entry: ReportEntry): DiscoveryContent {
  return {
    label: entry.data.label,
    title: entry.data.title,
    body: entry.data.summary,
    cta: {
      href: `/reports/${entry.id}/`,
      label: '阅读项目档案',
    },
    archiveHref: '/reports/',
    archiveLabel: '查看全部成果',
    image: entry.data.image,
    rangeStart: entry.data.rangeStart,
    rangeEnd: entry.data.rangeEnd,
  };
}

export function toSpectrumBars(entry: ReportEntry): SpectrumBarProps[] {
  return entry.data.spectrumBars.map((value) => ({ value }));
}

export function toNextDepartureContent(entry: DepartureEntry): NextDepartureContent {
  return {
    title: '加入迅雷实验室',
    label: '招新与培训流程',
    image: entry.data.image,
    allHref: '/departures/',
  };
}

export function toLaunchRow(entry: DepartureEntry): LaunchRowProps {
  return {
    date: entry.data.date,
    time: entry.data.time,
    title: entry.data.title,
    detail: entry.data.detail,
    href: `/departures/${entry.id}/`,
  };
}

export async function getNoteEntries() {
  const entries = await getCollection('notes');
  return entries.sort((left, right) => left.data.order - right.data.order);
}
