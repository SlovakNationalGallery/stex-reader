import { ref } from 'vue'
import { Lang, TRANSLATIONS } from '../consts'
import _ from 'lodash'

const lang = ref<Lang>("sk")

export const trans = (path: string) => {
    return _.get(TRANSLATIONS[lang.value], path)
}

export function useLang() {
    const setLang = (newLang: Lang) => {
        lang.value = newLang
    }
    return { setLang, lang, trans }
}