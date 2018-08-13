import { Subject } from 'rxjs'
import { ActionsUnion, createAction } from '../../redux'
import { ofType } from '../../redux/rx-operators'
import { Action } from '../../redux/types'

describe(`Rx operators`, () => {
  // it(`should properly filter action types via ofType`, () => {
  //   expect(true).toBe(true)
  // })

  describe('ofType', () => {
    const SET_AGE = '[core] set age'
    const SET_NAME = '[core] set name'
    const RELOAD_URL = '[router] Reload Page'

    const Actions = {
      setAge: (age: number) => createAction(SET_AGE, age),
      setName: (name: string) => createAction(SET_NAME, name),
      reloadUrl: () => createAction(RELOAD_URL),
    }

    type Actions = ActionsUnion<typeof Actions>

    it('should filter by action type', () => {
      const actions = new Subject<Actions>()
      const lulz = [] as object[]
      const haha = [] as object[]

      actions.pipe(ofType(SET_AGE)).subscribe(x => lulz.push(x))
      actions.pipe(ofType(SET_NAME)).subscribe(x => haha.push(x))

      actions.next({ type: SET_AGE, payload: 33 })

      expect(lulz).toEqual([{ type: SET_AGE, payload: 33 }])
      expect(haha).toEqual([])

      actions.next({ type: SET_AGE, payload: 11 })

      expect(lulz).toEqual([
        { type: SET_AGE, payload: 33 },
        { type: SET_AGE, payload: 11 },
      ])
      expect(haha).toEqual([])

      actions.next({ type: SET_NAME, payload: 'Martin' })

      expect(lulz).toEqual([
        { type: SET_AGE, payload: 33 },
        { type: SET_AGE, payload: 11 },
      ])
      expect(haha).toEqual([{ type: SET_NAME, payload: 'Martin' }])
    })

    it('should filter by multiple action types', () => {
      const actions = new Subject<Actions>()
      const lulz = [] as object[]
      const haha = [] as object[]

      actions.pipe(ofType(SET_AGE, SET_NAME)).subscribe(x => lulz.push(x))
      actions.pipe(ofType(RELOAD_URL)).subscribe(x => haha.push(x))

      actions.next({ type: SET_AGE, payload: 33 })

      expect(lulz).toEqual([{ type: SET_AGE, payload: 33 }])
      expect(haha).toEqual([])

      actions.next({ type: SET_NAME, payload: 'Martin' })

      expect(lulz).toEqual([
        { type: SET_AGE, payload: 33 },
        { type: SET_NAME, payload: 'Martin' },
      ])
      expect(haha).toEqual([])

      actions.next({ type: RELOAD_URL })

      expect(lulz).toEqual([
        { type: SET_AGE, payload: 33 },
        { type: SET_NAME, payload: 'Martin' },
      ])
      expect(haha).toEqual([{ type: RELOAD_URL }])
    })
  })
})
