// flow-typed signature: FAKE
// flow-typed version: FAKE/electron_v0.37.8/flow_>=v0.30.0

declare module 'electron' {
  declare export var shell: {
    showItemInFolder(fullPath: string): void,
    openItem(fullPath: string): void,
    openExternal(url: string, options?: {activate: boolean}): void,
    moveItemToTrash(fullPath: string): boolean,
    beep(): void,
    // Windows-only
    writeShortcutLink(
      shortcutPath: string,
      operation?: 'create' | 'update' | 'replace',
      options?: {
        target: string,
        cwd?: string,
        args?: string,
        description?: string,
        icon?: string,
        iconIndex?: number,
        appUserModelId?: string,
      }
    ): void,
    // Windows-only
    readShortcutLink(shortcutPath: string): void,
  };
}
