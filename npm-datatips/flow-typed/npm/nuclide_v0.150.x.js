// flow-typed signature: FAKE
// flow-typed version: FAKE/nuclide_v0.150.x/flow_>=v0.30.0

declare module 'nuclide' {
  // TODO: Figure out how to import this.
  declare var Atom: $Exports<'atom'>;
  // TODO: React is any. Why?
  declare var React: $Exports<'React'>;

  declare export interface IDisposable {
    dispose(): mixed
  }

  declare export function wordAtPosition(
    editor: Atom.TextEditor,
    position: Atom.Point,
    wordRegex_: ?RegExp,
  ): ?{wordMatch: Array<string>, range: Atom.Range};

  declare export type Datatip = {
    component: ReactClass<any>,
    range: Atom.Range,
    pinnable?: boolean,
  };

  declare export type PinnedDatatip = {
    dispose(): void
  };

  declare export type DatatipProvider = {
    datatip(editor: Atom.TextEditor, bufferPosition: Atom.Point): Promise<?Datatip>,
    inclusionPriority: number,
    validForScope(scopeName: string): boolean,
    // A unique name for the provider to be used for analytics.
    // It is recommended that it be the name of the provider's package.
    providerName: string,
  };

  declare export type DatatipAPI_1_0_0 = {
    register(provider: DatatipProvider): IDisposable,
    React: typeof React,
    wordAtPosition: typeof wordAtPosition,
  };

  declare export type DatatipAPI_0_0_0 = {
    register(provider: DatatipProvider): IDisposable,
    addProvider(provider: DatatipProvider): void,
    removeProvider(provider: DatatipProvider): void,
    createPinnedDataTip(
      component: ReactClass<any>,
      range: Range,
      pinnable?: boolean,
      editor: Atom.TextEditor,
      onDispose: (pinnedDatatip: PinnedDatatip) => void,
    ): PinnedDatatip,
    deletePinnedDatatip(datatip: PinnedDatatip): void,
  };
}
