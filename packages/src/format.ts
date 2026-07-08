import {
  DEFAULT_FORMAT,
  FORMAT_TOKEN_D,
  FORMAT_TOKEN_DD,
  FORMAT_TOKEN_H,
  FORMAT_TOKEN_HH,
  FORMAT_TOKEN_KEY_MAP,
  FORMAT_TOKEN_M,
  FORMAT_TOKEN_m,
  FORMAT_TOKEN_MM,
  FORMAT_TOKEN_mm,
  FORMAT_TOKEN_REGEX_MAP,
  FORMAT_TOKEN_s,
  FORMAT_TOKEN_ss,
  FORMAT_TOKEN_SSS,
  FORMAT_TOKEN_YY,
  FORMAT_TOKEN_YYYY,
  OBJECT_KEYS,
  REGEX_DATE_SEP,
  REGEX_DIGITS,
  REGEX_TIME_SEP,
} from "./const"
import { OhDay } from "./ohday"
import { escapeRegExp } from "./util"

/**
 * @description 可接受的时间输入类型, 包括 Date 对象, OhDay 对象, 字符串, 时间戳, 时间数组和时间对象
 */
export type OhDayLike = Date | OhDay | string | number | number[] | {
  year?: number
  month?: number
  date?: number
  day?: number
  hour?: number
  minute?: number
  second?: number
  ms?: number
}

/**
 * @description 解析字符串为 Date 对象, 支持自定义格式
 *   - 默认支持格式有: -分割的日期, /分割的日期, :分割的时间, 空格分割的日期和时间, .分割的毫秒
 */
export function parseString(input: string, format?: string): Date | null {
  // 判断是否传入格式化字符串
  if (format) {
    let pattern = "^"
    const fields: string[] = []
    let i = 0

    // 逐个匹配预定义token
    while (i < format.length) {
      let matched = false
      for (const [token, regexPart] of Object.entries(FORMAT_TOKEN_REGEX_MAP)) {
        if (format.startsWith(token, i)) {
          pattern += regexPart
          fields.push(FORMAT_TOKEN_KEY_MAP[token])

          i += token.length
          matched = true
          break
        }
      }

      // 不匹配则转义特殊字符
      if (!matched) {
        pattern += escapeRegExp(format[i])
        i++
      }
    }

    // 将合成的正则表达式进行匹配判断
    pattern += "$"
    const regex = new RegExp(pattern)
    const match = input.match(regex)
    if (!match)
      return null

    const values: (number | undefined)[] = Array.from({ length: OBJECT_KEYS.length })

    // 一点一点从input里面抽数字出来
    for (let idx = 0; idx < fields.length; idx++) {
      const fieldName = fields[idx] as typeof OBJECT_KEYS[number]
      const valueStr = match[idx + 1]
      const keyIndex = OBJECT_KEYS.indexOf(fieldName)
      if (keyIndex !== -1) {
        values[keyIndex] = valueStr ? Number(valueStr) : undefined
      }
    }

    // YY 补充为 20xx
    if (values[0] !== undefined && values[0] < 100) {
      values[0] += 2000
    }

    return complete(...values as [number | undefined, number | undefined, number | undefined, number | undefined, number | undefined, number | undefined, number | undefined])
  }
  else {
    // 是否包含日期
    const hasDateSep = REGEX_DATE_SEP.test(input)
    // 是否包含时间
    const hasTimeSep = REGEX_TIME_SEP.test(input)

    if (!hasDateSep && !hasTimeSep) {
      return null
    }
    else if (hasDateSep && hasTimeSep) {
      // 拆分日期部分和时间部分
      const [datePart, timePart] = input.replace("T", " ").split(/\s+/)
      const dateNums = datePart.match(REGEX_DIGITS) ?? []
      const timeNums = timePart.match(REGEX_DIGITS) ?? []

      return complete(
        Number(dateNums[0]),
        Number(dateNums[1]),
        Number(dateNums[2]),
        Number(timeNums[0]),
        Number(timeNums[1]),
        Number(timeNums[2]),
        timeNums[3] ? Number(timeNums[3]) : undefined,
      )
    }
    else if (hasDateSep && !hasTimeSep) {
      const nums = input.match(REGEX_DIGITS) ?? []
      return complete(
        Number(nums[0]),
        Number(nums[1]),
        Number(nums[2]),
      )
    }
    else {
      // 条件满足：!hasDateSep && hasTimeSep
      const nums = input.match(REGEX_DIGITS) ?? []
      return complete(
        undefined,
        undefined,
        undefined,
        Number(nums[0]),
        Number(nums[1]),
        Number(nums[2]),
        nums[3] ? Number(nums[3]) : undefined,
      )
    }
  }
}

/**
 * @description 缺省补齐函数
 *   - 补齐规则: 时间缺省为 0, 日期低位缺省为 1, 日期高位缺省为当前日期
 *   - 当所有值都缺省时, 返回当前时间
 */
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

/**
 * @description 解析输入为 Date 对象, 支持 Date 对象, OhDay 对象, 字符串, 时间戳, 时间数组和时间对象
 */
export function parseInput(input?: OhDayLike, format?: string): Date {
  if (!input)
    return new Date()

  if (input instanceof Date)
    return new Date(input)

  if (input instanceof OhDay)
    return input.dd

  if (typeof input === "number")
    return new Date(input)

  if (typeof input === "string") {
    const d = parseString(input, format)
    return d ?? new Date(input)
  }

  if (Array.isArray(input)) {
    return complete(...input as [number | undefined, number | undefined, number | undefined, number | undefined, number | undefined, number | undefined, number | undefined])
  }

  if (typeof input === "object") {
    const obj = input as Record<string, number>
    return complete(obj.year, obj.month, obj.date, obj.hour, obj.minute, obj.second, obj.ms)
  }

  return new Date()
}

/**
 * @description 格式化 Date 对象为字符串, 支持自定义格式
 */
export function formatDate(date: Date, formatStr: string = DEFAULT_FORMAT): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const ms = date.getMilliseconds()

  const tokenRegex = new RegExp([
    FORMAT_TOKEN_YYYY,
    FORMAT_TOKEN_YY,
    FORMAT_TOKEN_MM,
    FORMAT_TOKEN_M,
    FORMAT_TOKEN_DD,
    FORMAT_TOKEN_D,
    FORMAT_TOKEN_HH,
    FORMAT_TOKEN_H,
    FORMAT_TOKEN_mm,
    FORMAT_TOKEN_m,
    FORMAT_TOKEN_ss,
    FORMAT_TOKEN_s,
    FORMAT_TOKEN_SSS,
  ].join("|"), "g")
  return formatStr.replace(tokenRegex, (token) => {
    switch (token) {
      case FORMAT_TOKEN_YYYY: return String(year)
      case FORMAT_TOKEN_YY: return String(year % 100).padStart(2, "0")
      case FORMAT_TOKEN_MM: return String(month).padStart(2, "0")
      case FORMAT_TOKEN_M: return String(month)
      case FORMAT_TOKEN_DD: return String(day).padStart(2, "0")
      case FORMAT_TOKEN_D: return String(day)
      case FORMAT_TOKEN_HH: return String(hour).padStart(2, "0")
      case FORMAT_TOKEN_H: return String(hour)
      case FORMAT_TOKEN_mm: return String(minute).padStart(2, "0")
      case FORMAT_TOKEN_m: return String(minute)
      case FORMAT_TOKEN_ss: return String(second).padStart(2, "0")
      case FORMAT_TOKEN_s: return String(second)
      case FORMAT_TOKEN_SSS: return String(ms).padStart(3, "0")
    }
    return token
  })
}
