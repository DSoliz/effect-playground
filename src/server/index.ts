import { User, Record, Store } from '../models/index.js'

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

export const dataRepo = Object.freeze({
  users: async (): Promise<unknown[]> => Object.values(users),
  getUserById: async (id: string): Promise<unknown> => users[id],
  stores: async (): Promise<unknown[]> => Object.values(stores),
  getStoreById: async (id: string): Promise<unknown> => stores[id],
})
