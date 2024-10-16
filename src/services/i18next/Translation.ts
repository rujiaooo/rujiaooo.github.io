import { i18n as Client } from "i18next"
import { TranslateOption } from "../Translation"

export class I18nTranslator {

  constructor(private client: Client) { }

  public translate(key: string, opt?: TranslateOption): string {
    return this.client.t(key, {
      ...opt,
    })
  }

}