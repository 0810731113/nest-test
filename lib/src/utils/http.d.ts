/// <reference types="node" />
import http from 'http';
import https from 'https';
export declare function getHttpClient(): {
    httpAgent: http.Agent;
    httpsAgent: https.Agent;
};
