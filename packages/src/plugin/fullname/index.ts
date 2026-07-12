import type { OhDayFlag, OhDayLike, OhDayPlugin } from "../../index"

declare module "../../index" {
  interface OhDay {
    // Property getters as methods
    /**
     * @description Alias of getter `s`
     * @see s
     */
    getString: () => string
    /**
     * @description Alias of getter `iso`
     * @see iso
     */
    getISOString: () => string
    /**
     * @description Alias of getter `ts`
     * @see ts
     */
    getTime: () => number
    /**
     * @description Alias of getter `ts`
     * @see ts
     */
    getTimeStamp: () => number
    /**
     * @description Alias of getter `dd`
     * @see dd
     */
    getDateObject: () => Date
    /**
     * @description Alias of getter `year`
     * @see year
     */
    getYear: () => number
    /**
     * @description Alias of getter `month`
     * @see month
     */
    getMonth: () => number
    /**
     * @description Alias of getter `date`
     * @see date
     */
    getDate: () => number
    /**
     * @description Alias of getter `hour`
     * @see hour
     */
    getHour: () => number
    /**
     * @description Alias of getter `minute`
     * @see minute
     */
    getMinute: () => number
    /**
     * @description Alias of getter `second`
     * @see second
     */
    getSecond: () => number
    /**
     * @description Alias of getter `ms`
     * @see ms
     */
    getMS: () => number
    /**
     * @description Alias of getter `ms`
     * @see ms
     */
    getMilliseconds: () => number
    /**
     * @description Alias of getter `od`
     * @see od
     */
    clone: () => OhDay

    // Output
    /**
     * @description Alias of `p()`
     * @see p
     */
    format: (format?: string) => string
    /**
     * @description Alias of `p()`
     * @see p
     */
    print: (format?: string) => string
    /**
     * @description Alias of `p()`
     * @see p
     */
    toString: (format?: string) => string
    /**
     * @description Alias of `pa()`
     * @see pa
     */
    printArray: (scope?: OhDayFlag) => number[]
    /**
     * @description Alias of `pa()`
     * @see pa
     */
    toArray: (scope?: OhDayFlag) => number[]
    /**
     * @description Alias of `po()`
     * @see po
     */
    printObject: (scope?: OhDayFlag) => Record<string, number>
    /**
     * @description Alias of `po()`
     * @see po
     */
    toObject: (scope?: OhDayFlag) => Record<string, number>
    /**
     * @description Alias of `pd()`
     * @see pd
     */
    printDate: (scope?: OhDayFlag) => Date
    /**
     * @description Alias of `pd()`
     * @see pd
     */
    toDate: (scope?: OhDayFlag) => Date
    /**
     * @description Alias of `pd()`
     * @see pd
     */
    toDateObject: (scope?: OhDayFlag) => Date

    // Manipulation
    /**
     * @description Alias of `c()`
     * @see c
     */
    set: (scope: OhDayFlag, value: number) => OhDay
    /**
     * @description Alias of `c()`
     * @see c
     */
    change: (scope: OhDayFlag, value: number) => OhDay
    /**
     * @description Alias of `cs()`
     * @see cs
     */
    startOf: (scope: OhDayFlag, value?: number) => OhDay
    /**
     * @description Alias of `cs()`
     * @see cs
     */
    changeToStart: (scope: OhDayFlag, value?: number) => OhDay
    /**
     * @description Alias of `ce()`
     * @see ce
     */
    endOf: (scope: OhDayFlag, value?: number) => OhDay
    /**
     * @description Alias of `ce()`
     * @see ce
     */
    changeToEnd: (scope: OhDayFlag, value?: number) => OhDay
    /**
     * @description Alias of `g()`
     * @see g
     */
    get: (scope?: OhDayFlag) => number
    /**
     * @description Alias of `sub()`
     * @see sub
     */
    subtract: (scope: OhDayFlag, offset: number) => OhDay
    /**
     * @description Alias of `len()`
     * @see len
     */
    lengthOf: (scope: OhDayFlag, unit?: OhDayFlag, float?: boolean) => number
    /**
     * @description Alias of `len()`
     * @see len
     */
    getLength: (scope: OhDayFlag, unit?: OhDayFlag, float?: boolean) => number

    // Comparison
    /**
     * @description Alias of `eq()`
     * @see eq
     */
    isSame: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `eq()`
     * @see eq
     */
    isEqual: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `lt()`
     * @see lt
     */
    isBefore: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `lt()`
     * @see lt
     */
    isLessThan: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `gt()`
     * @see gt
     */
    isAfter: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `gt()`
     * @see gt
     */
    isGreaterThan: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `le()`
     * @see le
     */
    isSameOrBefore: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `le()`
     * @see le
     */
    isBeforeOrSame: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `le()`
     * @see le
     */
    isLessOrEqual: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `ge()`
     * @see ge
     */
    isSameOrAfter: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `ge()`
     * @see ge
     */
    isAfterOrSame: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `ge()`
     * @see ge
     */
    isGreaterOrEqual: (target: OhDayLike, scope?: OhDayFlag) => boolean
    /**
     * @description Alias of `bt()`
     * @see bt
     */
    isBetween: (target1: OhDayLike, target2: OhDayLike, scope?: OhDayFlag) => boolean
  }
}

export const fullname: OhDayPlugin = (instance) => {
  /* eslint-disable style/max-statements-per-line */
  instance.prototype.getString = function () { return this.s }
  instance.prototype.getISOString = function () { return this.iso }
  instance.prototype.getTime = function () { return this.ts }
  instance.prototype.getTimeStamp = function () { return this.ts }
  instance.prototype.getDateObject = function () { return this.dd }
  instance.prototype.getYear = function () { return this.year }
  instance.prototype.getMonth = function () { return this.month }
  instance.prototype.getDate = function () { return this.date }
  instance.prototype.getHour = function () { return this.hour }
  instance.prototype.getMinute = function () { return this.minute }
  instance.prototype.getSecond = function () { return this.second }
  instance.prototype.getMS = function () { return this.ms }
  instance.prototype.getMilliseconds = function () { return this.ms }
  instance.prototype.clone = function () { return this.od }
  /* eslint-enable style/max-statements-per-line */

  instance.prototype.format = instance.prototype.p
  instance.prototype.print = instance.prototype.p
  instance.prototype.toString = instance.prototype.p
  instance.prototype.printArray = instance.prototype.pa
  instance.prototype.toArray = instance.prototype.pa
  instance.prototype.printObject = instance.prototype.po
  instance.prototype.toObject = instance.prototype.po
  instance.prototype.printDate = instance.prototype.pd
  instance.prototype.toDate = instance.prototype.pd
  instance.prototype.toDateObject = instance.prototype.pd

  instance.prototype.set = instance.prototype.c
  instance.prototype.change = instance.prototype.c
  instance.prototype.startOf = instance.prototype.cs
  instance.prototype.changeToStart = instance.prototype.cs
  instance.prototype.endOf = instance.prototype.ce
  instance.prototype.changeToEnd = instance.prototype.ce
  instance.prototype.get = instance.prototype.g
  instance.prototype.subtract = instance.prototype.sub
  instance.prototype.lengthOf = instance.prototype.len
  instance.prototype.getLength = instance.prototype.len

  instance.prototype.isSame = instance.prototype.eq
  instance.prototype.isEqual = instance.prototype.eq
  instance.prototype.isBefore = instance.prototype.lt
  instance.prototype.isLessThan = instance.prototype.lt
  instance.prototype.isAfter = instance.prototype.gt
  instance.prototype.isGreaterThan = instance.prototype.gt
  instance.prototype.isSameOrBefore = instance.prototype.le
  instance.prototype.isBeforeOrSame = instance.prototype.le
  instance.prototype.isLessOrEqual = instance.prototype.le
  instance.prototype.isSameOrAfter = instance.prototype.ge
  instance.prototype.isAfterOrSame = instance.prototype.ge
  instance.prototype.isGreaterOrEqual = instance.prototype.ge
  instance.prototype.isBetween = instance.prototype.bt
}
