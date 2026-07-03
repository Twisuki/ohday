import type { OhDayFlag } from "./const"
import { DEFAULT_FORMAT, MS_A_DAY, MS_A_HOUR, MS_A_MINUTE, MS_A_SECOND } from "./const"
import { formatDate, parseInput } from "./format"
import { changeUnit, daysOfMonth, flag, getFlagByIndex, getFlagIndex, isLeapYear } from "./util"

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

export { OhDayFlag } from "./const"

export class OhDay {
  readonly $d: Date

  constructor(input?: OhDayLike) {
    this.$d = parseInput(input)
  }

  get s(): string {
    return formatDate(this.$d, DEFAULT_FORMAT)
  }

  get iso(): string {
    return this.$d.toISOString()
  }

  get ts(): number {
    return this.$d.getTime()
  }

  get dd(): Date {
    return new Date(this.$d)
  }

  get year(): number {
    return this.$d.getFullYear()
  }

  get month(): number {
    return this.$d.getMonth() + 1
  }

  get date(): number {
    return this.$d.getDate()
  }

  get day(): number {
    return this.$d.getDay()
  }

  get hour(): number {
    return this.$d.getHours()
  }

  get minute(): number {
    return this.$d.getMinutes()
  }

  get second(): number {
    return this.$d.getSeconds()
  }

  get ms(): number {
    return this.$d.getMilliseconds()
  }

  get od(): OhDay {
    return new OhDay(this)
  }

  c(scope: OhDayFlag, value: number): OhDay {
    return new OhDay(changeUnit(this.$d, scope, value))
  }

  cs(scope: OhDayFlag, value?: number): OhDay {
    let d = value ? this.c(scope, value) : this
    const h = getFlagIndex(scope)
    for (let i = h + 1; i < 7; i++) {
      const s = getFlagByIndex(i)
      d = d.c(s, s === "M" || s === "d" ? 1 : 0)
    }
    return d
  }

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

  add(scope: OhDayFlag, offset: number): OhDay {
    return this.c(scope, flag(scope, [
      this.year + offset,
      this.month + offset,
      this.ts + offset * MS_A_DAY,
      this.ts + offset * MS_A_HOUR,
      this.ts + offset * MS_A_MINUTE,
      this.ts + offset * MS_A_SECOND,
      this.ts + offset,
    ], 0))
  }

  sub(scope: OhDayFlag, offset: number): OhDay {
    return this.add(scope, -offset)
  }

  diff(target: OhDayLike, unit?: OhDayFlag, float?: boolean): number {
    const thatDate = parseInput(target)
    const that = new OhDay(thatDate)
    const diffMs = this.ms - that.ms

    return flag(unit ?? "ms", [
      float ? diffMs / MS_A_DAY / (isLeapYear(this.year) ? 366 : 365) : this.year - that.year,
      float ? diffMs / MS_A_DAY / daysOfMonth(this.year, this.month) : (this.year - that.year) * 12 + (this.month - that.month),
      float ? diffMs / MS_A_DAY : Math.floor(diffMs / MS_A_DAY),
      float ? diffMs / MS_A_HOUR : Math.floor(diffMs / MS_A_HOUR),
      float ? diffMs / MS_A_MINUTE : Math.floor(diffMs / MS_A_MINUTE),
      float ? diffMs / MS_A_SECOND : Math.floor(diffMs / MS_A_SECOND),
      diffMs,
    ], diffMs)
  }

  len(scope: OhDayFlag, unit?: OhDayFlag, float?: boolean): number {
    return this.ce(scope).diff(this.cs(scope), unit, float)
  }

  eq(target: OhDayLike, scope?: OhDayFlag): boolean {
    return this.diff(target, scope) === 0
  }

  lt(target: OhDayLike, scope?: OhDayFlag): boolean {
    return this.diff(target, scope) < 0
  }

  gt(target: OhDayLike, scope?: OhDayFlag): boolean {
    return this.diff(target, scope) > 0
  }

  le(target: OhDayLike, scope?: OhDayFlag): boolean {
    return this.diff(target, scope) <= 0
  }

  ge(target: OhDayLike, scope?: OhDayFlag): boolean {
    return this.diff(target, scope) >= 0
  }

  bt(t1: OhDayLike, t2: OhDayLike, scope?: OhDayFlag): boolean {
    return this.ge(t1, scope) && this.lt(t2, scope)
  }

  p(format?: string): string {
    return formatDate(this.$d, format || DEFAULT_FORMAT)
  }

  pa(scope?: OhDayFlag): number[] {
    const arr = []
    const l = getFlagIndex(scope ?? "ms")
    for (let i = 0; i <= l; i++) {
      const s = getFlagByIndex(i)
      arr.push(this.getValueByScope(s))
    }
    return arr
  }

  po(scope?: OhDayFlag): Record<string, number> {
    let obj = {}
    const l = getFlagIndex(scope ?? "ms")
    for (let i = 0; i <= l; i++) {
      const s = getFlagByIndex(i)
      const key = flag<string>(s, ["year", "month", "date", "hour", "minute", "second", "ms"], "ms")
      obj = { ...obj, [key]: this.getValueByScope(s) }
    }
    return obj
  }

  pd(scope?: OhDayFlag): Date {
    const arr = this.pa(scope)
    return parseInput(arr)
  }

  private getValueByScope(scope?: OhDayFlag): number {
    return flag(scope ?? "ms", [
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

export const od = (input?: OhDayLike): OhDay => new OhDay(input)
