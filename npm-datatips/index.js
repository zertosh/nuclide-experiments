/* @flow */
'use strict';

import type {
  DatatipAPI_1_0_0 as DatatipAPI,
  IDisposable
} from 'nuclide';

import invariant from 'assert';
import {CompositeDisposable, Disposable} from 'atom';

import datatipProvider from './DatatipProvider';

let subscriptions: ?CompositeDisposable = null;

export function activate(state: Object): void {
  subscriptions = new CompositeDisposable();
}

export function consumeDatatip(api: DatatipAPI): IDisposable {
  invariant(subscriptions != null);
  const disposable = api.register(datatipProvider(api));
  subscriptions.add(disposable);
  return new Disposable(() => {
    // nothing to do...
  });
}

export function deactivate(): void {
  invariant(subscriptions != null);
  subscriptions.dispose();
  subscriptions = null;
}
