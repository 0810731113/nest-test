/**
 * Make salt
 */
export declare function makeSalt(): string;
/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export declare function encryptPassword(password: string, salt: string): string;
