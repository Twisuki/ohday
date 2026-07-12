import type { OhDayFlag } from "./const"
import { DAY_OF_MONTH, FLAG_DATE, FLAG_MS, FLAG_WEEK, FLAGS } from "./const"

/**
 * @description 获取时间标签 Flag 的索引
 */
export function getFlagIndex(f: OhDayFlag): number {
  return FLAGS.indexOf(f === FLAG_WEEK ? FLAG_DATE : f)
}

/**
 * @description 根据索引获取时间标签 Flag
 */
export function getFlagByIndex(index: number): OhDayFlag {
  return FLAGS[index] ?? FLAG_MS
}

/**
 * @description 根据 Flag 获取对应的值
 * @param f 时间标签 Flag
 * @param cases 值数组
 * @param def 默认值
 */
export function flag<T>(f: OhDayFlag, cases: T[], def: T): T {
  return cases[getFlagIndex(f)] ?? def
}

/**
 * @description 判断是否为闰年
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * @description 获取指定月份的天数
 */
export function daysOfMonth(year: number, month: number): number {
  if (month === 2 && isLeapYear(year))
    return 29
  return DAY_OF_MONTH[month - 1]
}

/**
 * @description 转义正则表达式特殊字符
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * @description 将 week scope 映射为 date scope, 复用 date 精度路径
 */
export function mapWeekFlag(scope?: OhDayFlag): OhDayFlag {
  return scope === FLAG_WEEK ? FLAG_DATE : scope ?? FLAG_MS
}
