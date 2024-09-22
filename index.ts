import { Effect, Console, pipe } from 'effect'
import { Schema } from '@effect/schema'

const UserSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.optionalWith(Schema.String.pipe(Schema.nonEmptyString()), {
    exact: true,
  }),
})





type User = Schema.Schema.Type<typeof UserSchema>

const DateRangeSchema = Schema.Struct({
  startDate: Schema.optionalWith(Schema.Date, { exact: true }),
  endDate: Schema.optionalWith(Schema.Date, { exact: true }),
})

const EventSchema = Schema.Struct({
  id: Schema.String,
  owner: Schema.String,
  viewers: Schema.Array(Schema.String),
  name: Schema.optionalWith(Schema.String.pipe(Schema.nonEmptyString()), {
    exact: true,
  }),
  time: DateRangeSchema,
})

const ScheduleSchema = Schema.Struct({
  name: Schema.String.pipe(Schema.nonEmptyString()),
  type: Schema.String,
  openingHours: Schema.Array(DateRangeSchema),
})

const StoreSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.String.pipe(Schema.nonEmptyString()),
  schedules: Schema.Array(ScheduleSchema),
  adminIds: Schema.Array(Schema.String),
})
type Store = Schema.Schema.Type<typeof StoreSchema>

Schema.decodeSync(UserSchema)

Schema.decodeSync(StoreSchema)

type Record<T> = { [key: string]: T }

const users: Record<User> = {
  '1': Object.freeze({
    id: '1',
    name: 'Sebas',
  }),
  '3': Object.freeze({
    id: '3',
    name: 'Diego',
  }),
}

const stores: Record<Store> = {
  '25': {
    id: '25',
    name: 'Dento',
    adminIds: ['1'],
    schedules: [
      {
        name: 'default',
        type: 'weekly-start-monday',
        openingHours: [
          { startDate: new Date(), endDate: new Date() }, // monday
          { startDate: new Date(), endDate: new Date() }, // tuesday
          { startDate: new Date(), endDate: new Date() }, // wednesday
          { startDate: new Date(), endDate: new Date() }, // thursday
          { startDate: new Date(), endDate: new Date() }, // friday
          { startDate: new Date(), endDate: new Date() }, // saturday
          { startDate: new Date(), endDate: new Date() }, // sunday
        ],
      },
    ],
  },
}

const dataRepo = Object.freeze({
  users: async (): Promise<unknown[]> => Object.values(users),
  getUserById: async (id: string): Promise<unknown> => users[id],
  stores: async (): Promise<unknown[]> => Object.values(stores),
  getStoreById: async (id: string): Promise<unknown> => stores[id],
})
