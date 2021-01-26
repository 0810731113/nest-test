import http from 'http';
import https from 'https';

export function getHttpClient() {
  return {
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
  };
}
