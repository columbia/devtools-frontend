// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/* eslint-disable rulesdir/no_underscored_properties */

export class CharacterIdMap<T> {
  private readonly elementToCharacter: Map<T, string>;
  private readonly characterToElement: Map<string, T>;
  private charCode: number;

  constructor() {
    this.elementToCharacter = new Map();
    this.characterToElement = new Map();
    this.charCode = 33;
  }

  toChar(object: T): string {
    let character = this.elementToCharacter.get(object);
    if (!character) {
      if (this.charCode >= 0xFFFF) {
        throw new Error('CharacterIdMap ran out of capacity!');
      }
      character = String.fromCharCode(this.charCode++);
      this.elementToCharacter.set(object, character);
      this.characterToElement.set(character, object);
    }
    return character;
  }

  fromChar(character: string): T|null {
    const object = this.characterToElement.get(character);
    if (object === undefined) {
      return null;
    }
    return object;
  }
}
