import strings from "./strings.json";

class I18n {
  strings: object;
  constructor() {
    this.strings = strings;
  }
  get get(): any {
    return this.strings;
  }
  set(strings: object): any {
    this.strings = strings;
  }
  trans(str: string, placeholders?: { [key: string]: any }) {
    if (!placeholders || Object.keys(placeholders).length === 0) {
      return str;
    }
    let result = str;
    for (const placeholder in placeholders) {
      result = result.replace(`::${placeholder}`, placeholders[placeholder]);
    }
    return result;
  }
}
export default new I18n();
