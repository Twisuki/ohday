// region 时间 Flag
/**
 * @description 用于标记时间单位的 Flag 类型
 */
export type OhDayFlag = "y" | "M" | "d" | "h" | "m" | "s" | "ms"

export const FLAG_YEAR = "y"
export const FLAG_MONTH = "M"
export const FLAG_DATE = "d"
export const FLAG_HOUR = "h"
export const FLAG_MINUTE = "m"
export const FLAG_SECOND = "s"
export const FLAG_MS = "ms"

export const FLAGS = [
  FLAG_YEAR,
  FLAG_MONTH,
  FLAG_DATE,
  FLAG_HOUR,
  FLAG_MINUTE,
  FLAG_SECOND,
  FLAG_MS,
] as const
// endregion

// region 时间长度
export const SECOND_A_MINUTE = 60
export const SECOND_A_HOUR = SECOND_A_MINUTE * 60
export const SECOND_A_DAY = SECOND_A_HOUR * 24

export const MS_A_SECOND = 1e3
export const MS_A_MINUTE = SECOND_A_MINUTE * MS_A_SECOND
export const MS_A_HOUR = SECOND_A_HOUR * MS_A_SECOND
export const MS_A_DAY = SECOND_A_DAY * MS_A_SECOND

export const DAY_OF_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const
// endregion

// region 时间 token 与对象键
export const FORMAT_TOKEN_YYYY = "YYYY"
export const FORMAT_TOKEN_YY = "YY"
export const FORMAT_TOKEN_MM = "MM"
export const FORMAT_TOKEN_M = "M"
export const FORMAT_TOKEN_DD = "DD"
export const FORMAT_TOKEN_D = "D"
export const FORMAT_TOKEN_HH = "HH"
export const FORMAT_TOKEN_H = "H"
export const FORMAT_TOKEN_mm = "mm"
export const FORMAT_TOKEN_m = "m"
export const FORMAT_TOKEN_ss = "ss"
export const FORMAT_TOKEN_s = "s"
export const FORMAT_TOKEN_SSS = "SSS"

export const OBJECT_KEY_YEAR = "year"
export const OBJECT_KEY_MONTH = "month"
export const OBJECT_KEY_DATE = "date"
export const OBJECT_KEY_HOUR = "hour"
export const OBJECT_KEY_MINUTE = "minute"
export const OBJECT_KEY_SECOND = "second"
export const OBJECT_KEY_MS = "ms"

export const OBJECT_KEYS = [
  OBJECT_KEY_YEAR,
  OBJECT_KEY_MONTH,
  OBJECT_KEY_DATE,
  OBJECT_KEY_HOUR,
  OBJECT_KEY_MINUTE,
  OBJECT_KEY_SECOND,
  OBJECT_KEY_MS,
] as const
// endregion

// region 时间格式化
export const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss"

export const REGEX_DIGITS = /\d+/g
export const REGEX_DATE_SEP = /[-/]/
export const REGEX_TIME_SEP = /:/

export const FORMAT_TOKEN_REGEX_MAP: Record<string, string> = {
  [FORMAT_TOKEN_YYYY]: String.raw`(\d{4})`,
  [FORMAT_TOKEN_YY]: String.raw`(\d{2})`,
  [FORMAT_TOKEN_SSS]: String.raw`(\d{3})`,
  [FORMAT_TOKEN_MM]: String.raw`(\d{2})`,
  [FORMAT_TOKEN_DD]: String.raw`(\d{2})`,
  [FORMAT_TOKEN_HH]: String.raw`(\d{2})`,
  [FORMAT_TOKEN_mm]: String.raw`(\d{2})`,
  [FORMAT_TOKEN_ss]: String.raw`(\d{2})`,
  [FORMAT_TOKEN_M]: String.raw`(\d{1,2})`,
  [FORMAT_TOKEN_D]: String.raw`(\d{1,2})`,
  [FORMAT_TOKEN_H]: String.raw`(\d{1,2})`,
  [FORMAT_TOKEN_m]: String.raw`(\d{1,2})`,
  [FORMAT_TOKEN_s]: String.raw`(\d{1,2})`,
}

export const FORMAT_TOKEN_KEY_MAP: Record<string, string> = {
  [FORMAT_TOKEN_YYYY]: OBJECT_KEY_YEAR,
  [FORMAT_TOKEN_YY]: OBJECT_KEY_YEAR,
  [FORMAT_TOKEN_SSS]: OBJECT_KEY_MS,
  [FORMAT_TOKEN_MM]: OBJECT_KEY_MONTH,
  [FORMAT_TOKEN_DD]: OBJECT_KEY_DATE,
  [FORMAT_TOKEN_HH]: OBJECT_KEY_HOUR,
  [FORMAT_TOKEN_mm]: OBJECT_KEY_MINUTE,
  [FORMAT_TOKEN_ss]: OBJECT_KEY_SECOND,
  [FORMAT_TOKEN_M]: OBJECT_KEY_MONTH,
  [FORMAT_TOKEN_D]: OBJECT_KEY_DATE,
  [FORMAT_TOKEN_H]: OBJECT_KEY_HOUR,
  [FORMAT_TOKEN_m]: OBJECT_KEY_MINUTE,
  [FORMAT_TOKEN_s]: OBJECT_KEY_SECOND,
}
// endregion
