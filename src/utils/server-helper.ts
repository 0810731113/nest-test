import { Lang, LOCALE } from '../types/renderContext';

export const parseNavLang = (acceptLanguage?: string): Lang => {
  // 服务端无法获取navigator.language，所以只能通过Accept-Language来判断浏览器语言。
  let navigatorLang: Lang = LOCALE.default;
  if (!acceptLanguage) {
    return navigatorLang;
  }
  const clientLang = acceptLanguage;
  if (clientLang.startsWith('zh')) {
    navigatorLang = LOCALE.zh;
  } else if (clientLang.startsWith('en')) {
    navigatorLang = LOCALE.en;
  }
  return navigatorLang;
};
