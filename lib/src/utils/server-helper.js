"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNavLang = void 0;
const renderContext_1 = require("../types/renderContext");
const parseNavLang = (acceptLanguage) => {
    // 服务端无法获取navigator.language，所以只能通过Accept-Language来判断浏览器语言。
    let navigatorLang = renderContext_1.LOCALE.default;
    if (!acceptLanguage) {
        return navigatorLang;
    }
    const clientLang = acceptLanguage;
    if (clientLang.startsWith('zh')) {
        navigatorLang = renderContext_1.LOCALE.zh;
    }
    else if (clientLang.startsWith('en')) {
        navigatorLang = renderContext_1.LOCALE.en;
    }
    return navigatorLang;
};
exports.parseNavLang = parseNavLang;
//# sourceMappingURL=server-helper.js.map