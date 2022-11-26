import { LANG_TYPE, LangType } from 'constants/constants';

const getLangType = (): LangType => {
  const lang: string | null = localStorage.getItem(LANG_TYPE);
  if (lang === LangType.en || lang === LangType.ru) {
    return lang;
  }
  return LangType.en;
};

export default getLangType;
