'use babel';

import { parse } from 'path';
import {
  createGroupButtons,
  createButton,
  createIcon,
  createIconFromPath,
  createText,
  createElement,
  createSelect,
  createOption,
  insertElement
} from '../element/index';

export class BugsPanelView {
  private element: HTMLElement;
  private scheme: {
    icon: HTMLElement,
    name: Text
  };
  private schemePath: {
    select: HTMLElement,
    name: Text
  };
  private selectPath: HTMLElement;
  constructor () {
    this.element = document.createElement('atom-bugs-panel');
    // create schemes
    this.scheme = {
      icon: createIconFromPath(''),
      name: createText('')
    };
    // create scheme path
    this.schemePath = {
      name: createText('Current File'),
      select: createSelect({
        change: (e) => this.setPathName(e.target.value)
      }, [])
    }

    // Icon
    insertElement(this.element, createIcon('logo'))
    // Run
    insertElement(this.element, createButton({
      click () {
        // run
      }
    },[
      createIcon('run'),
      createText('Run')
    ]))
    // Pause
    insertElement(this.element, createButton({
      click () {
        // pause
      }
    },[
      createIcon('stop')
    ]))
    // Scheme Buttons
    insertElement(this.element, createGroupButtons([
      createButton({
        className: 'bugs-scheme'
      }, [
        createIcon('atom'),
        this.schemePath.name,
        this.schemePath.select,
        createElement('div', {
          className: 'bugs-scheme-arrow'
        })
      ]),
      createButton({
        click () {
          // scheme editor
          let panel = document.createElement('div');
          atom.workspace.addModalPanel({
            item: panel
          })
        }
      }, [
        this.scheme.icon,
        this.scheme.name
      ])
    ]))
  }
  getSelectedSchemeName () {
    return 'Node.js';
  }
  setScheme (scheme) {
    // set icon bg
    this.scheme.icon.style.backgroundImage = `url(${scheme.iconPath})`;
    // set scheme name
    this.scheme.name.nodeValue = ` ${scheme.name}`
  }
  public setPathName (name: string) {
    let baseName = parse(name).base
    this.schemePath.name.nodeValue = ` ${baseName}`
  }
  public setPaths (paths: Array<string>) {
    // clear old list
    this.schemePath.select.innerHTML = '';
    // add new paths
    paths.forEach((p: string, index: number) => {
      // activate first
      if (index === 0) {
        this.setPathName(p)
      }
      // insert option to path select
      insertElement(this.schemePath.select, createOption(parse(p).base, p))
    })
  }
  public getElement () {
    return this.element;
  }
  public destroy () {
    this.element.remove();
  }
}
