import { DEFAULT_FORMAT, REGEX_DATE_SEP, REGEX_DIGITS, REGEX_TIME_SEP } from "./const"
import { OhDay } from "./ohday"

export type OhDayLike = Date | string | number | number[] | {
  year?: number
  month?: number
  date?: number
  day?: number
  hour?: number
  minute?: number
  second?: number
  ms?: number
}

export function parseString(input: string): Date | null {
  const hasDateSep = REGEX_DATE_SEP.test(input)
  const hasTimeSep = REGEX_TIME_SEP.test(input)

  if (!hasDateSep && !hasTimeSep)
    return null

  if (hasDateSep && hasTimeSep) {
    const [datePart, timePart] = input.split(/\s+/)
    const dateNums = datePart.match(REGEX_DIGITS) ?? []
    const timeNums = timePart.match(REGEX_DIGITS) ?? []
    const [year, month, date] = dateNums
    const [hour, minute, second, ms] = timeNums
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(date) || 1,
      Number(hour) || 0,
      Number(minute) || 0,
      Number(second) || 0,
      Number(ms) || 0,
    )
  }

  if (hasDateSep) {
    const nums = input.match(REGEX_DIGITS) ?? []
    const [year, month, date] = nums
    return new Date(Number(year), Number(month) - 1, Number(date) || 1, 0, 0, 0, 0)
  }

  const nums = input.match(REGEX_DIGITS) ?? []
  const [hour, minute, second, ms] = nums
  const now = new Date()
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    Number(hour) || 0,
    Number(minute) || 0,
    Number(second) || 0,
    Number(ms) || 0,
  )
}

export function complete(year?: number, month?: number, date?: number, hour?: number, minute?: number, second?: number, ms?: number): Date {
  const now = new Date()
  const hasYear = year !== undefined
  const hasMonth = month !== undefined
  const hasDate = date !== undefined

  const y = hasYear ? year! : now.getFullYear()
  const M = hasMonth ? month! : hasYear ? 1 : now.getMonth() + 1
  const d = hasDate ? date! : (hasYear || hasMonth) ? 1 : now.getDate()
  const h = hour ?? 0
  const m = minute ?? 0
  const s = second ?? 0
  const msVal = ms ?? 0

  return new Date(y, M - 1, d, h, m, s, msVal)
}

export function parseInput(input?: OhDayLike): Date {
  if (!input)
    return new Date()

  if (input instanceof Date)
    return new Date(input)

  if (input instanceof OhDay)
    return input.dd

  if (typeof input === "number")
    return new Date(input)

  if (typeof input === "string") {
    const parsed = parseString(input)
    if (parsed) {
      return complete(parsed.getFullYear(), parsed.getMonth() + 1, parsed.getDate(), parsed.getHours(), parsed.getMinutes(), parsed.getSeconds(), parsed.getMilliseconds())
    }
    const isoDate = new Date(input)
    if (!Number.isNaN(isoDate.getTime())) {
      return complete(isoDate.getFullYear(), isoDate.getMonth() + 1, isoDate.getDate(), isoDate.getHours(), isoDate.getMinutes(), isoDate.getSeconds(), isoDate.getMilliseconds())
    }
  }

  if (Array.isArray(input)) {
    return complete(input[0], input[1], input[2], input[3], input[4], input[5], input[6])
  }

  if (typeof input === "object") {
    const obj = input as Record<string, number>
    return complete(obj.year, obj.month, obj.date, obj.hour, obj.minute, obj.second, obj.ms)
  }

  return new Date()
}

export function formatDate(date: Date, formatStr: string = DEFAULT_FORMAT): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const ms = date.getMilliseconds()

  return formatStr.replace(/YYYY|MM|DD|HH|mm|ss|ms/g, (token) => {
    switch (token) {
      case "YYYY": return String(year)
      case "MM": return month < 10 ? `0${month}` : String(month)
      case "DD": return day < 10 ? `0${day}` : String(day)
      case "HH": return hour < 10 ? `0${hour}` : String(hour)
      case "mm": return minute < 10 ? `0${minute}` : String(minute)
      case "ss": return second < 10 ? `0${second}` : String(second)
      case "ms": return ms < 10 ? `00${ms}` : ms < 100 ? `0${ms}` : String(ms)
    }
    return token
  })
}
