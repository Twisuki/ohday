import type { OhDayFlag } from "./const"
import { DAY_OF_MONTH, FLAG_DATE, FLAG_HOUR, FLAG_MINUTE, FLAG_MONTH, FLAG_MS, FLAG_SECOND, FLAG_YEAR } from "./const"

const FLAG_INDEX: Record<OhDayFlag, number> = { [FLAG_YEAR]: 0, [FLAG_MONTH]: 1, [FLAG_DATE]: 2, [FLAG_HOUR]: 3, [FLAG_MINUTE]: 4, [FLAG_SECOND]: 5, [FLAG_MS]: 6 }
const FLAG_BY_INDEX: OhDayFlag[] = [FLAG_YEAR, FLAG_MONTH, FLAG_DATE, FLAG_HOUR, FLAG_MINUTE, FLAG_SECOND, FLAG_MS]

export function getFlagIndex(f: OhDayFlag): number {
  return FLAG_INDEX[f]
}

export function getFlagByIndex(index: number): OhDayFlag {
  return FLAG_BY_INDEX[index] ?? FLAG_MS
}

export function flag<T>(f: OhDayFlag, cases: T[], def: T): T {
  return cases[FLAG_INDEX[f]] ?? def
}

export function daysOfMonth(year: number, month: number): number {
  if (month === 2 && isLeapYear(year))
    return 29
  return DAY_OF_MONTH[month - 1]
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function changeUnit(date: Date, scope: OhDayFlag, value?: number): Date {
  if (value === undefined)
    return date

  const d = new Date(date)
  const ms = d.getMilliseconds()

  flag(scope, [
    d.setFullYear(value),
    d.setMonth(value - 1),
    d.setDate(value),
    d.setHours(value),
    d.setMinutes(value),
    d.setSeconds(value),
    d.setMilliseconds(value),
  ], 0)

  d.setMilliseconds(ms)
  return d
}
