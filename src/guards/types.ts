type EmptyArray = Array<never>
type Blank = null | undefined | void

/**
 * // object collects {} and Array<any> so adding both {} and Array<any> is not needed
 * @private
 */
export type AllowedEmptyCheckTypes = Blank | string | object

/**
 * Empty mapped type that will cast any AllowedEmptyCheckTypes to empty equivalent
 * @private
 */
export type Empty<T extends AllowedEmptyCheckTypes> = T extends Blank
  ? T
  : T extends string
    ? ''
    : T extends any[] ? EmptyArray : T extends object ? {} : never
