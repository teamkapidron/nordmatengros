import {
  endOfDay,
  startOfDay,
  parse,
  subDays,
  addDays,
  format,
} from 'date-fns';

import { DateMatchStage } from './interfaces/date';

export function getDurationInMs(unit: 'days' | 'weeks' | 'months' | 'years') {
  switch (unit) {
    case 'days':
      return 24 * 60 * 60 * 1000;
    case 'weeks':
      return 7 * 24 * 60 * 60 * 1000;
    case 'months':
      return 30 * 24 * 60 * 60 * 1000;
    case 'years':
      return 365 * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
}

export function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export function getDateMatchStage(
  key: string,
  from?: string,
  to?: string,
  defaultDays: number = 30,
): DateMatchStage {
  const matchStage: DateMatchStage = {};

  if (!from && !to && defaultDays) {
    const toDate = endOfDay(new Date());
    const fromDate = startOfDay(subDays(toDate, defaultDays));

    matchStage[key] = {
      $gte: fromDate,
      $lte: toDate,
    };

    return matchStage;
  }

  if (from || to) {
    const dateCondition: DateMatchStage[keyof DateMatchStage] = {};

    if (from) {
      const fromDate = startOfDay(parse(from, 'yyyy-MM-dd', new Date()));
      dateCondition.$gte = fromDate;
    }

    if (to) {
      const toDate = endOfDay(parse(to, 'yyyy-MM-dd', new Date()));
      dateCondition.$lte = toDate;
    }

    matchStage[key] = dateCondition;
  }

  return matchStage;
}

export function fillMissingDates<T extends Record<string, any>>(
  data: T[],
  from?: string,
  to?: string,
  defaultDays: number = 30,
  dateKey: string = 'date',
  metrics: string[] = ['count'],
): T[] {
  let startDate: Date, endDate: Date;

  if (from && to) {
    startDate = parse(from, 'yyyy-MM-dd', new Date());
    endDate = parse(to, 'yyyy-MM-dd', new Date());
  } else {
    endDate = endOfDay(new Date());
    startDate = startOfDay(subDays(endDate, defaultDays));
  }

  const dataMap: Record<string, T> = {};
  data.forEach((item) => {
    const dateValue = item[dateKey];
    if (dateValue && typeof dateValue === 'string') {
      dataMap[dateValue] = item;
    }
  });

  const result: T[] = [];

  while (startDate <= endDate) {
    const dateStr = format(startDate, 'yyyy-MM-dd');
    const formattedDate = formatDate(dateStr);

    let existingData: T | undefined = undefined;

    if (dateStr && typeof dateStr === 'string') {
      existingData = dataMap[dateStr];
    }

    if (!existingData && formattedDate && typeof formattedDate === 'string') {
      existingData = dataMap[formattedDate];
    }

    if (existingData) {
      result.push(existingData);
    } else {
      const newEntry: Record<string, any> = {};
      newEntry[dateKey] = formattedDate;

      metrics.forEach((metric) => {
        newEntry[metric] = 0;
      });

      result.push(newEntry as T);
    }

    startDate = addDays(startDate, 1);
  }

  return result;
}
