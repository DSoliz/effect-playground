import { Effect, pipe } from 'effect'
import { dataRepo } from './data-repo/index.js'
import { ChannelTypeId } from 'effect/Channel'

/*








*/

const fetchStores = Effect.promise(() => dataRepo.stores())
const fetchUser = Effect.promise(() => dataRepo.getUserById('1'))
const fetchUserFail = Effect.sync(() => Effect.fail(1))

// const program = pipe(fetchStores, Effect.tap(console.info))
// Effect.runPromise(program)

const program2 = pipe(
  Effect.all([fetchStores, fetchUser, fetchUserFail]),
  Effect.tap(console.info)
)
Effect.runPromise(program2)
