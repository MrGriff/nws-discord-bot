import * as path from 'path';
import * as glob from 'glob';
import { fr as fr } from './fr';

export const messages = fr;

export namespace Messages {
  // Languages for which messages are defined under this dir are acceptable
  export const acceptableLanguages = glob.sync(`${__dirname}/*.js`)
    .map((file) => path.basename(file, '.js'))
    .filter((language) => language !== 'Message');
  // require messages for each language and cache
  const map = acceptableLanguages.reduce((acc, language) => {
    acc[language] = require(`./${language}`)[language];
    return acc;
  }, {} as {[language: string]: typeof messages});

  /**
   * Returns a messages object for the specified language
   */
  export function messagesOf(language: string): typeof messages {
    return map[language];
  }
}