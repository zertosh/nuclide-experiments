/* @flow */
'use strict';

import type {
  TextEditor,
  Point,
} from 'atom'

import type {
  Datatip,
  DatatipAPI_1_0_0 as DatatipAPI,
  DatatipProvider,
} from 'nuclide';

import * as path from 'path';
import invariant from 'assert';
import {shell} from 'electron';

const JSON_KEY_VALUE = /(?:")([a-z0-9-_]+)(?:"\s*:\s*")([0-9.^~=x]+)(?:")/ig;

export default function datatipProvider(api: DatatipAPI): DatatipProvider {
  const {React, wordAtPosition} = api;

  type Props = {
    name: string,
    permalink: string,
    description: ?string,
    homepage: ?string,
    latest: ?string,
  };

  class PackageDetailsComponent extends React.Component {
    props: Props;
    constructor(props: Props) {
      super(props);
      (this: any)._onHomepageClick = this._onHomepageClick.bind(this);
      (this: any)._onNpmClick = this._onNpmClick.bind(this);
    }
    _onHomepageClick() {
      invariant(this.props.homepage != null);
      shell.openExternal(this.props.homepage);
    }
    _onNpmClick() {
      shell.openExternal(this.props.permalink);
    }
    render() {
      const {description, name, latest} = this.props;
      return (
        <div style={{margin: 10}}>
          <h2>{name}@{latest}</h2>
          <h3>{description}</h3>
          <div className='block'>
            <div className='btn-group'>
              <button
                className='btn btn-info icon icon-link'
                onClick={this._onNpmClick}>
                npm
              </button>
              <button
                className='btn btn-info icon icon-home'
                onClick={this._onHomepageClick}>
                homepage
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return {
    validForScope: scope => scope === 'source.json',
    providerName: 'npm-datatips',
    inclusionPriority: 1,
    async datatip(editor: TextEditor, position: Point): Promise<?Datatip> {
      const editorPath = editor.getPath();
      if (editorPath == null) {
        return null;
      }
      const filename = path.basename(editorPath);
      if (filename !== 'package.json') {
        return null;
      }

      const match = wordAtPosition(editor, position, JSON_KEY_VALUE);
      if (match == null) {
        return null;
      }

      const {wordMatch: [, name/*, version*/], range} = match;
      const quotelessRange = range.translate([0, 1], [0, -1]);

      let pkgDetails = null;
      try {
        const response = await fetch(`https://registry.npmjs.org/${name}`);
        const json: Object = await response.json();
        pkgDetails = {
          name,
          permalink: `https://www.npmjs.com/package/${name}`,
          description: json.description || '',
          homepage: json.homepage || '',
          latest: json['dist-tags'].latest || '',
        };
      } catch (err) {
        return null;
      }

      return {
        component: () => <PackageDetailsComponent {...pkgDetails} />,
        range: quotelessRange,
      };
    },
  };
}
