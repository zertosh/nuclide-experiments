// flow-typed signature: FAKE
// flow-typed version: FAKE/atom-types_v1.8.x/flow_>=v0.30.0

declare module 'atom' {
  declare interface IDisposable {
    dispose(): mixed
  }

  declare export class CompositeDisposable {
    constructor(...disposables: IDisposable[]): void,
    dispose(): void,

    add(disposable: IDisposable): void,
    remove(disposable: IDisposable): void,
    clear(): void,
  }

  declare export class Disposable {
    constructor(disposalAction?: (...args: any[]) => any): void,
    dispose(): void,
  }

  declare export class Point {
    static fromObject(object: Point | [number, number], copy:? boolean): Point,
    constructor(row: number, column: number): void,
    row: number,
    column: number,
    copy(): Point,
    negate(): Point,

    // Comparison
    min(point1: Point, point2: Point): Point,
    compare(other: Point): -1 | 0 | 1,
    isEqual(otherRange: Point | [number, number]): boolean,
    isLessThan(other: Point): boolean,
    isLessThanOrEqual(other: Point): boolean,
    isGreaterThan(other: Point): boolean,
    isGreaterThanOrEqual(other: Point): boolean,

    // Operations
    translate(other: Point | [number, number]): Point,

    // Conversion
    serialize(): Array<number>,
    toArray(): Array<number>,
  }

  declare export class Range {
    static fromObject(
      object: Range | [Point | [number, number], Point | [number, number]],
      copy?: boolean,
    ): Range,
    constructor(
      pointA: Point | number | [number, number],
      pointB: Point | number | [number, number],
    ): void,
    start: Point,
    end: Point,
    isEmpty(): boolean,
    isEqual(otherRange: Range | [[number, number], [number, number]]): boolean,
    containsPoint(point: Point, exclusive?: boolean): boolean,
    containsRange(other: Range, exclusive?: boolean): boolean,
    translate(startDelta: Point | [number, number], endDelta?: Point | [number, number]): Range,
    serialize(): Array<Array<number>>,
  }

  // Using this constructor directly is deprecated, but expose the type this way.
  declare export class TextEditor {
    getPath(): ?string,
  }
}
