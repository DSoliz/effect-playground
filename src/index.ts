import { Effect, pipe, Schedule } from 'effect'
import { dataRepo } from './data-repo/index.js'
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from '@effect/platform'

const fetchStores = Effect.tryPromise({
  try: () => dataRepo.stores(),
  catch: (error) => Effect.fail(error),
})
const fetchUser = Effect.promise(() => dataRepo.getUserById('1'))
const fetchUserFail = Effect.promise(async () => {
  Effect.sleep(2000)
  return Effect.fail(1)
})

const retryPolicy = Schedule.exponential(2000).pipe(
  Schedule.compose(Schedule.recurs(15))
)

const call = (id: number) =>
  HttpClientRequest.get(`/todos`).pipe(
    HttpClientRequest.appendUrlParams({ id: id })
  )

const fetchUserFailWithRetry = pipe(
  fetchUserFail,
  Effect.timeout('1 second'),
  Effect.retry(retryPolicy),
  Effect.tap(console.info)
)
Effect.runPromise(fetchUserFailWithRetry)

const program = pipe(fetchStores, Effect.tap(console.info))
Effect.runPromise(program)

const program2 = pipe(
  Effect.all([fetchStores, fetchUser, fetchUserFail]),
  Effect.flatMap(([stores, user]) => {
    return pipe(
      stores,
      Effect.flatMap((st) =>
        pipe(
          user,
          Effect.map((userVal) => {
            return st[0].name + userVal.name
          })
        )
      )
    )
  }),
  Effect.tap(console.info)
)
Effect.runPromise(program2)

const program3 = Effect.gen(function* () {
  const stores = yield* fetchStores
  const storesVal = yield* stores
  const user = yield* fetchUser
  const userVal = yield* user

  // const fail = yield* fetchUserFail
  // Unwrapping this results in failure
  // const failVal = yield* fail

  return userVal.name + storesVal[0].name
}).pipe(Effect.tap(console.info))
Effect.runPromise(program3)

const program4 = Effect.gen(function* () {
  const stores = yield* Effect.flatten(fetchStores)
  const user = yield* Effect.flatten(fetchUser)

  // Unwrapping this results in failure
  // const fail = yield* Effect.flatten(fetchUserFail)

  return user.name + stores[0].name + user.name
}).pipe(Effect.tap(console.info))
Effect.runPromise(program4)
