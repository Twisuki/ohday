# ohday - Chainable, immutable, lightweight date/time processing library.

```ts
od().c("M", 2).add("d", 10).ps("MM/DD YYYY")
```

- **Chainable API**: Concise method chaining for fluent date manipulation.
- **Immutable Design**: Every operation returns a new instance, promoting stable values and reactive-friendly patterns.
- **Tiny Bundle**: Minimal footprint comparable to dayjs, zero dependencies.
- **Short API**: Minimal character names.
- **Rich Input Support**: Support for various input types and custom format parsing.
- **TypeScript Support**: Full TypeScript definitions included.

## Getting Started

ohday is coming to npm soon. Stay tuned!

## API

### Input

```ts
import { od } from "ohday"

// String parsing (auto-detect format)
od("2026-06-26 12:34:56") // "2026-06-26 12:34:56"
od("2026-06-26") // "2026-06-26 00:00:00"
od("12:34:56") // "2026-07-07 12:34:56" (today + time)
od("2026-06-26T12:34:56Z") // ISO format supported

// Custom format parsing
od("26-06-2026", "DD-MM-YYYY") // "2026-06-26 00:00:00"

// Array input: [year, month, date, hour, minute, second, ms?]
od([2026, 6, 26, 12, 34, 56]) // "2026-06-26 12:34:56"
od([2026, 6, 26]) // "2026-06-26 00:00:00"

// Object input
od({ year: 2026, month: 6, date: 26, hour: 12, minute: 34, second: 56 })
od({ year: 2026, month: 6 }) // "2026-06-01 00:00:00"
od({ hour: 12 }) // "2026-07-07 12:00:00" (today + time)

// Date object
od(new Date("2026-06-26")) // "2026-06-26 00:00:00"

// Timestamp (milliseconds)
od(1918684496000) // "2026-01-01 12:34:56"

// OhDay clone
const d = od("2026-06-26")
od(d) // returns a new instance with same date
```

### Change

```ts
// .c(scope, value) - change a specific unit to a new value
od("2026-06-26 12:34:56").c("y", 2025) // "2025-06-26 12:34:56"
od("2026-06-26 12:34:56").c("M", 2) // "2026-02-26 12:34:56"
od("2026-06-26 12:34:56").c("d", 31) // "2026-06-30 12:34:56" (auto-adjusts overflow)
od("2026-06-26 12:34:56").c("h", 0) // "2026-06-26 00:34:56"

// .cs(scope, value?) - change to the start of the specified unit
od("2026-06-26 12:34:56").cs("y") // "2026-01-01 00:00:00"
od("2026-06-26 12:34:56").cs("M") // "2026-06-01 00:00:00"
od("2026-06-26 12:34:56").cs("d") // "2026-06-26 00:00:00"
od("2026-06-26 12:34:56").cs("M", 5) // "2026-05-01 00:00:00" (start of May)

// .ce(scope, value?) - change to the end of the specified unit
od("2026-06-26 12:34:56").ce("y") // "2026-12-31 23:59:59"
od("2026-06-26 12:34:56").ce("M") // "2026-06-30 23:59:59"
od("2026-06-26 12:34:56").ce("d") // "2026-06-26 23:59:59"
od("2026-06-26 12:34:56").ce("h", 3) // "2026-06-26 03:59:59" (end of 3 o'clock)
```

### Calculate

```ts
// .add(scope, offset) - add offset to the specified unit
od("2026-06-26 12:34:56").add("d", 5) // "2026-07-01 12:34:56"
od("2026-06-26 12:34:56").add("M", 4) // "2026-10-26 12:34:56"
od("2026-06-26 12:34:56").add("y", -1) // "2025-06-26 12:34:56"

// .sub(scope, offset) - subtract offset from the specified unit
od("2026-06-26 12:34:56").sub("h", 15) // "2026-06-25 21:34:56"
od("2026-06-26 12:34:56").sub("M", 3) // "2026-03-26 12:34:56"

// .diff(target, unit?, float?) - calculate difference between two dates
od("2026-06-28 08:00:00").diff("2026-06-26 12:34:56", "d") // 2 (integer days)
od("2026-06-28 08:00:00").diff("2026-06-26 12:34:56", "d", true) // 1.81... (float days)
od("2026-06-26 12:34:56").diff("2026-06-25", "d") // 1
od("2026-06-26 12:34:56").diff("2026-06-27", "d", true) // -0.47... (negative means target is in future)

// .len(scope, unit?, float?) - calculate the length of a unit in a given time unit
od("2026-06-26 12:34:56").len("d", "h") // 24 (hours in a day)
od("2026-06-26 12:34:56").len("M", "d") // 30 (days in June)
od("2026-06-26 12:34:56").len("y", "d") // 365 or 366 (days in year, leap-year aware)
od("2026-06-26 12:34:56").len("m", "h") // 0 (0 hours in a minute, integer)
od("2026-06-26 12:34:56").len("m", "h", true) // 0.01666... (float)
```

### Compare

```ts
const d1 = od("2026-06-26")
const d2 = od("2026-06-27")

// .lt(target, scope?) - less than
d1.lt(d2) // true
d1.lt("2026-07-01", "M") // false (June is not less than July in months)

// .gt(target, scope?) - greater than
d1.gt(d2) // false
d1.gt("2026-01-01", "y") // false (same year)

// .eq(target, scope?) - equal
od("2026-06-26").eq("2026-06-26 12:00:00") // false (different time)
od("2026-06-26").eq("2026-06-26 12:00:00", "d") // true (same day)
od("2026-06-26").eq("2026-05-25", "y") // true (same year)

// .le(target, scope?) - less than or equal
d1.le(d2) // true
d1.le(d1) // true

// .ge(target, scope?) - greater than or equal
d1.ge(d1) // true
d1.ge("2026-01-01", "y") // true

// .bt(target1, target2, scope?) - between (inclusive start, exclusive end)
od("2026-06-26").bt("2026-06-25", "2026-06-27") // true
od("2026-06-26").bt("2026-06-26", "2026-06-27", "d") // true (inclusive start)
od("2026-06-26").bt("2026-06-26", "2026-06-26", "d") // false (exclusive end)
```

### Output

```ts
const d = od("2026-06-26 12:34:56")

// Property getters
d.s // "2026-06-26 12:34:56" (default format string)
d.iso // "2026-06-26T12:34:56.000+08:00" (ISO 8601)
d.ts // 1918684496000 (Unix timestamp in ms)
d.dd // Date object (clone of internal Date)
d.year // 2026
d.month // 6 (1-12, not 0-11 like native Date)
d.date // 26
d.day // 5 (0=Sunday, 1=Monday, ..., 6=Saturday)
d.hour // 12
d.minute // 34
d.second // 56
d.ms // 0
d.od // OhDay instance (clone)

// .p(format?) - print as formatted string
d.p() // "2026-06-26 12:34:56" (default)
d.p("YYYY/MM/DD") // "2026/06/26"
d.p("MM-DD-YYYY") // "06-26-2026"
d.p("HH:mm:ss") // "12:34:56"

// .pa(scope?) - print as array
d.pa() // [2026, 6, 26, 12, 34, 56, 0] (full precision)
d.pa("d") // [2026, 6, 26] (up to day)
d.pa("M") // [2026, 6] (up to month)
d.pa("h") // [2026, 6, 26, 12] (up to hour)

// .po(scope?) - print as object
d.po() // { year: 2026, month: 6, date: 26, hour: 12, minute: 34, second: 56, ms: 0 }
d.po("d") // { year: 2026, month: 6, date: 26 }
d.po("M") // { year: 2026, month: 6 }

// .pd(scope?) - print as Date object at precision
d.pd() // Date("2026-06-26T12:34:56.000+08:00")
d.pd("d") // Date("2026-06-26T00:00:00.000+08:00") (start of day)
d.pd("M") // Date("2026-06-01T00:00:00.000+08:00") (start of month)
```

### Flags

The `OhDayFlag` type defines time units used across API methods:

```ts
"y"  // year
"M"  // month
"d"  // day
"h"  // hour
"m"  // minute
"s"  // second
"ms" // millisecond
```

## License

ohday is licensed under a [MIT License](./LICENSE).
