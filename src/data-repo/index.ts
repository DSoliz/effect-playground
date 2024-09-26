import { Effect } from 'effect'
import { User, Record, Store } from '../models/index.js'

const users: Record<User> = {
  '1': {
    id: '1',
    name: 'Sebas',
  },
  '3': {
    id: '3',
    name: 'Diego',
  },
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

export const dataRepo = Object.freeze({
  users: async (): Promise<Effect.Effect<User[], Error>> =>
    users
      ? Effect.succeed(Object.values(users))
      : Effect.fail(new Error('users not found')),
  getUserById: async (id: string): Promise<Effect.Effect<User, Error>> =>
    users[id]
      ? Effect.succeed(users[id])
      : Effect.fail(new Error('user not found')),
  stores: async (): Promise<Effect.Effect<Store[], Error>> =>
    stores
      ? Effect.succeed(Object.values(stores))
      : Effect.fail(new Error('store not found')),
  getStoreById: async (id: string): Promise<Effect.Effect<Store, Error>> =>
    stores[id]
      ? Effect.succeed(stores[id])
      : Effect.fail(new Error('stores not found')),
})
