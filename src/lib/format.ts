const utcDateFormatters = {
  short: new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }),
  long: new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }),
};

export function formatShortDate(date: Date) {
  return utcDateFormatters.short.format(date).replaceAll('/', '.');
}

export function formatLongDate(date: Date) {
  return utcDateFormatters.long.format(date);
}

export function formatLaunchTime(time: string) {
  return time;
}

export function formatReadingTime(minutes: number) {
  return `约 ${Math.max(1, minutes)} 分钟阅读`;
}

export function toUtcDateInput(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
