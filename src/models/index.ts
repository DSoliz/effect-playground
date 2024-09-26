import { Schema } from '@effect/schema'

export const UserSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.optionalWith(Schema.String.pipe(Schema.nonEmptyString()), {
    exact: true,
  }),
})

export type User = Schema.Schema.Type<typeof UserSchema>

export const DateRangeSchema = Schema.Struct({
  startDate: Schema.optionalWith(Schema.Date, { exact: true }),
  endDate: Schema.optionalWith(Schema.Date, { exact: true }),
})

export const EventSchema = Schema.Struct({
  id: Schema.String,
  owner: Schema.String,
  viewers: Schema.Array(Schema.String),
  name: Schema.optionalWith(Schema.String.pipe(Schema.nonEmptyString()), {
    exact: true,
  }),
  time: DateRangeSchema,
})

export const ScheduleSchema = Schema.Struct({
  name: Schema.String.pipe(Schema.nonEmptyString()),
  type: Schema.String,
  openingHours: Schema.Array(DateRangeSchema),
})

export const StoreSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.String.pipe(Schema.nonEmptyString()),
  schedules: Schema.Array(ScheduleSchema),
  adminIds: Schema.Array(Schema.String),
})
export type Store = Schema.Schema.Type<typeof StoreSchema>

export type Record<T> = { [key: string]: T }
