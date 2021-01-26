import http from 'http';
import https from 'https';
import Shell from 'shelljs';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import assert from 'assert';
import { cacheDir, serverFile, synFiles } from '../constants';

const httpClient = axios.create({
  timeout: 3000,
  maxRedirects: 5,
  validateStatus(status) {
    return status >= 200 && status <= 400;
  },
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
});

let eTagMap = {};

/**
 *
 *
 * @returns {Promise<boolean>} 是否更新了? false 为不需要更新, true 为已通知 worker 更新
 */
export async function checkServerJs(): Promise<boolean> {
  // const fetchUrl = process.env.SSR_ENTRY_JS;
  let baseUrl = `${process.env.TARGET}${process.env.PUBLIC_PATH}`;
  let ret = false;
  try {
    let isUpdated = await peekUpdate(baseUrl + serverFile);
    if (!isUpdated) {
      return false;
    }
    let results = await Promise.allSettled(
      synFiles.map((name) => baseUrl + name).map((url) => getFile(url)),
    );

    results.forEach((res, idx) => {
      if (res.status === 'fulfilled') {
        if (typeof res.value === 'boolean') {
          ret ||= res.value;
        } else {
          if (!fs.existsSync(cacheDir)) {
            Shell.mkdir('-p', cacheDir);
          }
          fs.writeFileSync(path.join(cacheDir, synFiles[idx]), res.value);
          ret = true;
        }
      } else {
        console.error(res.reason);
      }
    });
  } catch (e) {
    console.error(e);
  }

  return ret;
}

async function getFile(url: string): Promise<string | boolean> {
  assert(url);
  console.log(`get file from url ${url}`);

  const res = await httpClient.get(url, {
    headers: {
      'If-None-Match': eTagMap[url] || '',
    },
  });

  // 如果是 json, 要变成 string
  let data = typeof res.data === 'string' ? res.data : JSON.stringify(res.data);

  console.log(
    `get response ${res.status} from ${url}, etag:${JSON.stringify(
      res.headers.etag,
    )}, length:${data.length}`,
  );
  if (res.status === 304) {
    //  304 代表不需要修改
    return false;
  }

  eTagMap[url] = res.headers.etag;

  return data;
}
/**
 *
 *
 * @param {string} url
 * @returns {Promise<boolean>} 是否更新了
 */
async function peekUpdate(url: string): Promise<boolean> {
  console.log(`peek file: it is update?. from url ${url}`);

  if (!eTagMap[url]) {
    console.log(`updated`);
    return true;
  }

  const res = await httpClient.head(url, {
    headers: {
      'If-None-Match': eTagMap[url] || '',
    },
  });

  if (res.status === 304) {
    console.log(`no update`);
    return false;
  } else {
    console.log(
      `updated: etag:${JSON.stringify(res.headers.etag)}, length:${
        res.data.length
      }`,
    );
    return true;
  }
}
