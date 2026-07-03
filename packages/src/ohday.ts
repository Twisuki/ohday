import type { OhDayFlag } from "./const"
import type { OhDayLike } from "./format"
import {
  DEFAULT_FORMAT,
  FLAG_DATE,
  FLAG_MONTH,
  FLAG_MS,
  FLAG_YEAR,
  MS_A_DAY,
  MS_A_HOUR,
  MS_A_MINUTE,
  MS_A_SECOND,
  OBJECT_KEY_DATE,
  OBJECT_KEY_HOUR,
  OBJECT_KEY_MINUTE,
  OBJECT_KEY_MONTH,
  OBJECT_KEY_MS,
  OBJECT_KEY_SECOND,
  OBJECT_KEY_YEAR,
} from "./const"
import { formatDate, parseInput } from "./format"
import { daysOfMonth, flag, getFlagByIndex, getFlagIndex, isLeapYear } from "./util"

export { OhDayFlag } from "./const"
export { OhDayLike } from "./format"

/**
 * @description OhDay 类, 支持多种解析, 操作, 计算, 比较和输出方法, 用于处理日期和时间
 */
export class OhDay {
  readonly $d: Date

  /**
   * @description OhDay 构造函数, 用于创建一个新的 OhDay 实例
   * @param input 可被 OhDay 直接解析的时间类型, 包括 Date 对象, 时间字符串, 时间戳, 数字数组以及时间对象
   * @param format 可选的格式化字符串, 用于解析时间字符串
   */
  constructor(input?: OhDayLike, format?: string) {
    this.$d = parseInput(input, format)
  }

  // region 信息
  /**
   * @description 获取默认格式化字符串, 格式为 "YYYY-MM-DD HH:mm:ss"
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").s // "2023-10-01 12:30:45"
   * ```
   */
  get s(): string {
    return formatDate(this.$d, DEFAULT_FORMAT)
  }

  /**
   * @description 获取 ISO 8601 格式化字符串, 格式为 "YYYY-MM-DDTHH:mm:ss.sssZ"
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").iso // "2023-10-01T04:30:45Z"
   * ```
   */
  get iso(): string {
    return this.$d.toISOString()
  }

  /**
   * @description 获取时间戳, 单位为毫秒
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").ts // 1696159845000
   * ```
   */
  get ts(): number {
    return this.$d.getTime()
  }

  /**
   * @description 获取 Date 对象
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").dd // Date对象
   * ```
   */
  get dd(): Date {
    return new Date(this.$d)
  }

  /**
   * @description 获取数字年份
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").year // 2023
   * ```
   */
  get year(): number {
    return this.$d.getFullYear()
  }

  /**
   * @description 获取数字月份, 范围为 1-12
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").month // 10
   * ```
   */
  get month(): number {
    return this.$d.getMonth() + 1
  }

  /**
   * @description 获取数字日期, 范围为 1-31
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").date // 1
   * ```
   */
  get date(): number {
    return this.$d.getDate()
  }

  /**
   * @description 获取数字星期, 范围为 0-6, 其中 0 表示星期日
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").day // 0
   * ```
   */
  get day(): number {
    return this.$d.getDay()
  }

  /**
   * @description 获取数字小时, 范围为 0-23
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").hour // 12
   * ```
   */
  get hour(): number {
    return this.$d.getHours()
  }

  /**
   * @description 获取数字分钟, 范围为 0-59
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").minute // 30
   * ```
   */
  get minute(): number {
    return this.$d.getMinutes()
  }

  /**
   * @description 获取数字秒, 范围为 0-59
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").second // 45
   * ```
   */
  get second(): number {
    return this.$d.getSeconds()
  }

  /**
   * @description 获取数字毫秒, 范围为 0-999
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").ms // 678
   * ```
   */
  get ms(): number {
    return this.$d.getMilliseconds()
  }

  /**
   * @description 获取当前 OhDay 实例的副本
   * @example
   * ```ts
   * od("2023-10-01 12:30:45").od // OhDay实例
   * ```
   */
  get od(): OhDay {
    return new OhDay(this)
  }
  // endregion

  // region 操作
  /**
   * @description 修改当前 OhDay 实例的指定时间单位的值, 返回一个新的 OhDay 实例
   *   - 当出现日期溢出时, 会自动调整为该月的最后一天
   * @param scope 被修改的时间单位
   * @param value 新的时间值
   * @example
   * ```ts
   * // 修改年份为 2025
   * od("2023-10-01 12:30:45").c("y", 2025).s // "2025-10-01 12:30:45"
   * ```
   */
  c(scope: OhDayFlag, value: number): OhDay {
    const d = new Date(this.$d)
    const date = d.getDate()
    flag(scope, [
      () => d.setFullYear(value),
      () => d.setMonth(value - 1),
      () => d.setDate(value),
      () => d.setHours(value),
      () => d.setMinutes(value),
      () => d.setSeconds(value),
      () => d.setMilliseconds(value),
    ], () => {})()

    if ((scope === FLAG_YEAR || scope === FLAG_MONTH) && d.getDate() !== date) {
      d.setDate(0)
    }
    return new OhDay(d)
  }

  /**
   * @description 修改当前 OhDay 示例到指定单位指定值的初始时刻, 返回一个新的 OhDay 实例
   * @param scope 被修改的时间单位
   * @param value 新的时间值, 默认使用当前时间值
   * @example
   * ```ts
   * // 修改至 2 月份的初始时刻
   * od("2023-10-01 12:30:45").cs("M", 2).s // "2023-02-01 00:00:00"
   * ```
   */
  cs(scope: OhDayFlag, value?: number): OhDay {
    let d = value ? this.c(scope, value) : this
    const h = getFlagIndex(scope)
    for (let i = h + 1; i < 7; i++) {
      const s = getFlagByIndex(i)
      d = d.c(s, s === FLAG_MONTH || s === FLAG_DATE ? 1 : 0)
    }
    return d
  }

  /**
   * @description 修改当前 OhDay 示例到指定单位指定值的结束时刻, 返回一个新的 OhDay 实例
   * @param scope 被修改的时间单位
   * @param value 新的时间值, 默认使用当前时间值
   * @example
   * ```ts
   * // 修改至 2 月份的结束时刻
   * od("2023-10-01 12:30:45").ce("M", 2).s // "2023-02-28 23:59:59"
   * ```
   */
  ce(scope: OhDayFlag, value?: number): OhDay {
    let d = value ? this.c(scope, value) : this
    const h = getFlagIndex(scope)
    for (let i = h + 1; i < 7; i++) {
      const s = getFlagByIndex(i)
      d = d.c(s, flag(s, [
        9999, // 不会进入该分支
        12, // 仅修改年份时, 才会进入该分支
        daysOfMonth(d.year, d.month),
        23,
        59,
        59,
        999,
      ], 0))
    }
    return d
  }
  // endregion

  // region 计算
  /**
   * @description 在当前 OhDay 实例的指定时间单位上增加指定的偏移量, 返回一个新的 OhDay 实例
   *   - 当出现日期溢出时, 会自动调整为该月的最后一天
   * @param scope 被修改的时间单位
   * @param offset 偏移量, 可以为正数或负数
   * @example
   * ```ts
   * // 在当前时间的年份上增加 1 年
   * od("2023-10-01 12:30:45").add("y", 1).s // "2024-10-01 12:30:45"
   * ```
   */
  add(scope: OhDayFlag, offset: number): OhDay {
    return this.c(scope, this.getValueByScope(scope) + offset)
  }

  /**
   * @description 在当前 OhDay 实例的指定时间单位上减少指定的偏移量, 返回一个新的 OhDay 实例
   *   - 当出现日期溢出时, 会自动调整为该月的最后一天
   * @param scope 被修改的时间单位
   * @param offset 偏移量, 可以为正数或负数
   * @example
   * ```ts
   * // 在当前时间的年份上减少 1 年
   * od("2023-10-01 12:30:45").sub("y", 1).s // "2022-10-01 12:30:45"
   * ```
   */
  sub(scope: OhDayFlag, offset: number): OhDay {
    return this.add(scope, -offset)
  }

  /**
   * @description 计算当前 OhDay 实例与目标时间的差值, 返回一个数字, 单位为指定的时间单位
   * @param target 目标时间, 支持多种类型的解析
   * @param unit 返回值的时间单位, 默认为毫秒
   * @param float 是否返回浮点数, 默认为 false
   * @example
   * ```ts
   * // 计算当前时间与目标时间的差值, 单位为天
   * od("2023-10-01 12:30:45").diff("2022-10-01 12:30:45", "d") // 365
   * ```
   */
  diff(target: OhDayLike, unit?: OhDayFlag, float?: boolean): number {
    const thatDate = parseInput(target)
    const that = new OhDay(thatDate)
    const diffMs = this.ts - that.ts

    return flag(unit ?? FLAG_MS, [
      float ? diffMs / MS_A_DAY / (isLeapYear(this.year) ? 366 : 365) : this.year - that.year,
      float ? diffMs / MS_A_DAY / daysOfMonth(this.year, this.month) : (this.year - that.year) * 12 + (this.month - that.month),
      float ? diffMs / MS_A_DAY : Math.floor(diffMs / MS_A_DAY),
      float ? diffMs / MS_A_HOUR : Math.floor(diffMs / MS_A_HOUR),
      float ? diffMs / MS_A_MINUTE : Math.floor(diffMs / MS_A_MINUTE),
      float ? diffMs / MS_A_SECOND : Math.floor(diffMs / MS_A_SECOND),
      diffMs,
    ], diffMs)
  }

  /**
   * @description 计算当前 OhDay 实例在指定时间单位上的长度, 返回一个数字, 单位为指定的时间单位
   * @param scope 指定的时间单位
   * @param unit 返回值的时间单位
   * @param float 是否返回浮点数, 默认为 false
   * @example
   * ```ts
   * // 计算当前时间在指定时间单位上的长度, 单位为天
   * od("2023-10-01 12:30:45").len("M", "d") // 31
   * ```
   */
  len(scope: OhDayFlag, unit?: OhDayFlag, float?: boolean): number {
    return this.ce(scope).diff(this.cs(scope), unit, float)
  }
  // endregion

  // region 比较
  /**
   * @description 比较当前 OhDay 实例与目标时间在指定单位上是否相等, 返回一个布尔值
   * @param target 目标时间, 支持多种类型的解析
   * @param scope 比较的时间单位, 默认为毫秒
   * @example
   * ```ts
   * // 按天比较当前时间与目标时间是否相等
   * od("2023-10-01 12:30:45").eq("2023-10-01 00:00:00", "d") // true
   * ```
   */
  eq(target: OhDayLike, scope?: OhDayFlag): boolean {
    return this.diff(target, scope) === 0
  }

  /**
   * @description 比较当前 OhDay 实例在指定单位上是否小于目标时间, 返回一个布尔值
   * @param target 目标时间, 支持多种类型的解析
   * @param scope 比较的时间单位, 默认为毫秒
   * @example
   * ```ts
   * // 按天比较当前时间是否小于目标时间
   * od("2023-10-01 12:30:45").lt("2023-10-02 00:00:00", "d") // true
   * ```
   */
  lt(target: OhDayLike, scope?: OhDayFlag): boolean {
    return this.diff(target, scope) < 0
  }

  /**
   * @description 比较当前 OhDay 实例在指定单位上是否大于目标时间, 返回一个布尔值
   * @param target 目标时间, 支持多种类型的解析
   * @param scope 比较的时间单位, 默认为毫秒
   * @example
   * ```ts
   * // 按天比较当前时间是否大于目标时间
   * od("2023-10-01 12:30:45").gt("2034-09-30 00:00:00", "d") // true
   * ```
   */
  gt(target: OhDayLike, scope?: OhDayFlag): boolean {
    return this.diff(target, scope) > 0
  }

  /**
   * @description 比较当前 OhDay 实例在指定单位上是否小于等于目标时间, 返回一个布尔值
   * @param target 目标时间, 支持多种类型的解析
   * @param scope 比较的时间单位, 默认为毫秒
   * @example
   * ```ts
   * // 按天比较当前时间是否小于等于目标时间
   * od("2023-10-01 12:30:45").le("2023-10-02 00:00:00", "d") // true
   * ```
   */
  le(target: OhDayLike, scope?: OhDayFlag): boolean {
    return this.diff(target, scope) <= 0
  }

  /**
   * @description 比较当前 OhDay 实例在指定单位上是否大于等于目标时间, 返回一个布尔值
   * @param target 目标时间, 支持多种类型的解析
   * @param scope 比较的时间单位, 默认为毫秒
   * @example
   * ```ts
   * // 按天比较当前时间是否大于等于目标时间
   * od("2026-01-02 12:00:00").ge("2026-01-01 00:00:00", "d") // true
   * ```
   */
  ge(target: OhDayLike, scope?: OhDayFlag): boolean {
    return this.diff(target, scope) >= 0
  }

  /**
   * @description 判断当前 OhDay 实例是否在两个目标时间之间, 返回一个布尔值
   *   - 默认比较范围为左闭右开区间, 即 [target1, target2)
   * @param target1 比较范围的起始时间, 支持多种类型的解析
   * @param target2 比较范围的结束时间, 支持多种类型的解析
   * @param scope 比较的时间单位, 默认为毫秒
   * @example
   * ```ts
   * // 按天判断当前时间是否在两个目标时间之间
   * od("2023-10-01 12:30:45").bt("2023-09-30 00:00:00", "2023-10-02 00:00:00", "d") // true
   * ```
   */
  bt(target1: OhDayLike, target2: OhDayLike, scope?: OhDayFlag): boolean {
    return this.ge(target1, scope) && this.lt(target2, scope)
  }
  // endregion

  // region 输出
  /**
   * @description 将当前 OhDay 实例格式化为指定格式的字符串, 返回一个字符串
   * @param format 输出字符串的格式, 默认为 "YYYY-MM-DD HH:mm:ss"
   * @example
   * ```ts
   * // 将当前时间格式化为 "YYYY/MM/DD" 格式的字符串
   * od("2023-10-01 12:30:45").p("YYYY/MM/DD") // "2023/10/01"
   * ```
   */
  p(format?: string): string {
    return formatDate(this.$d, format || DEFAULT_FORMAT)
  }

  /**
   * @description 将当前 OhDay 实例的按精度输出为数组, 返回一个数字数组
   * @param scope 输出的精度范围, 默认为毫秒
   * @example
   * ```ts
   * // 将当前时间以天为精度输出为数组
   * od("2023-10-01 12:30:45").pa("d") // [2023, 10, 1]
   * ```
   */
  pa(scope?: OhDayFlag): number[] {
    const arr = []
    const l = getFlagIndex(scope ?? FLAG_MS)
    for (let i = 0; i <= l; i++) {
      const s = getFlagByIndex(i)
      arr.push(this.getValueByScope(s))
    }
    return arr
  }

  /**
   * @description 将当前 OhDay 实例的按精度输出为对象, 返回一个键值对对象
   * @param scope 输出的精度范围, 默认为毫秒
   * @example
   * ```ts
   * // 将当前时间以天为精度输出为对象
   * od("2023-10-01 12:30:45").po("d") // { year: 2023, month: 10, date: 1 }
   * ```
   */
  po(scope?: OhDayFlag): Record<string, number> {
    let obj = {}
    const l = getFlagIndex(scope ?? FLAG_MS)
    for (let i = 0; i <= l; i++) {
      const s = getFlagByIndex(i)
      const key = ([
        OBJECT_KEY_YEAR,
        OBJECT_KEY_MONTH,
        OBJECT_KEY_DATE,
        OBJECT_KEY_HOUR,
        OBJECT_KEY_MINUTE,
        OBJECT_KEY_SECOND,
        OBJECT_KEY_MS,
      ] as const)[i]
      obj = { ...obj, [key]: this.getValueByScope(s) }
    }
    return obj
  }

  /**
   * @description 将当前 OhDay 实例的按精度输出为 Date 对象, 返回一个 Date 对象
   * @param scope 输出的精度范围, 默认为毫秒
   * @example
   * ```ts
   * // 将当前时间以天为精度输出为 Date 对象
   * od("2023-10-01 12:30:45").pd("d") // Date对象
   * ```
   */
  pd(scope?: OhDayFlag): Date {
    const arr = this.pa(scope)
    return parseInput(arr)
  }
  // endregion

  private getValueByScope(scope?: OhDayFlag): number {
    return flag(scope ?? FLAG_MS, [
      this.year,
      this.month,
      this.date,
      this.hour,
      this.minute,
      this.second,
      this.ms,
    ], this.ms)
  }
}

/**
 * @description 创建一个新的 OhDay 实例的工厂函数
 * @param input 可被 OhDay 直接解析的时间类型, 包括 Date 对象, 时间字符串, 时间戳, 数字数组以及时间对象
 * @param format 可选的格式化字符串, 用于解析时间字符串
 * @example
 * ```ts
 * // 创建一个新的 OhDay 实例
 * od("2023-10-01 12:30:45") // OhDay实例
 * ```
 */
export const od = (input?: OhDayLike, format?: string): OhDay => new OhDay(input, format)
