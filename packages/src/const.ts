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

export const SECOND_A_MINUTE = 60
export const SECOND_A_HOUR = SECOND_A_MINUTE * 60
export const SECOND_A_DAY = SECOND_A_HOUR * 24

export const MS_A_SECOND = 1e3
export const MS_A_MINUTE = SECOND_A_MINUTE * MS_A_SECOND
export const MS_A_HOUR = SECOND_A_HOUR * MS_A_SECOND
export const MS_A_DAY = SECOND_A_DAY * MS_A_SECOND

export const DAY_OF_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const

export const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss"

export const REGEX_DIGITS = /\d+/g
export const REGEX_DATE_SEP = /[-/]/
export const REGEX_TIME_SEP = /:/
