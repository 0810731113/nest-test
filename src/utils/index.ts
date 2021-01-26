import { resolve } from 'path';

export const resolveDir = (path: string) => resolve(process.cwd(), path);

function getVersion(str: string) {
  try {
    const arr = /\d+(\.\d+)+/.exec(str);
    if (arr === null) {
      throw new Error(str);
    }
    return arr[0];
  } catch (error) {
    console.error(`请检查cdn地址是否符合规范${str}`);
  }
}
