import { OnModuleInit } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import { cachedFiles, cacheDir } from '../constants';
import { checkServerJs } from '../utils/sync-server';
import pm2 from 'pm2';

/**
 * 用来缓存和同步 umi.server.js
 * If-None-Match: W/"9a22e3-Xyi8H6Oi75XeUEojzSsulU8wMjg"
 */
@Injectable()
export class EntryService implements OnModuleInit {
  logger = new Logger('EntryService');
  serverPath: string;
  callbacks: ((render: Function) => void)[] = [];

  constructor(private readonly config: ConfigService) {
    this.serverPath = this.config.get('ssr.serverEntryPath')!;
  }

  async onModuleInit() {
    this.syncEntryFromAgent();
    // 第一次主动下载
    // console.log(process.env.START_BY_PM2);
    // if (process.env.START_BY_PM2 !== 'true') {
    await this.reloadEntry();
    // }
  }

  register(cb: (render: Function) => void) {
    this.callbacks.push(cb);
  }

  // 根据 agent 消息同步 serverjs 缓存
  syncEntryFromAgent() {
    process.on('message', (packet) => {
      // console.log(packet);
      if (packet.data.type === 'updateServerJs' && packet.topic === 'worker') {
        this.logger.log('recv agent message:  updateServerJs');
        this.notifyNewEntry();
      }
    });
  }

  notifyNewEntry() {
    this.removeCacheEntry();
    const entry = this.getCacheEntry();
    this.callbacks.forEach((cb) => cb(entry));
  }

  async reloadEntry() {
    if (process.env.START_BY_PM2 === 'true' && process.send) {
      this.reloadEntryByAgent();
    } else {
      await this.reloadEntryBySelf();
    }
  }

  // 不走 agent, 自己 reload
  async reloadEntryBySelf() {
    this.logger.log('reload entry by self');
    const res = await checkServerJs();
    if (res) {
      this.notifyNewEntry();
    }
  }

  // 不需要同步, 异步同步
  reloadEntryByAgent() {
    this.logger.log('reload entry by send to agent message');
    // console.log(process.send.toString());
    // console.log(process.connected);
    pm2.connect(function (err) {
      if (err) {
        console.error(err);
        process.exit(2);
      }

      pm2.list((err, list) => {
        if (err) {
          return;
        }
        const agent = list.filter((l) => l.name.endsWith('-agent'))[0];
        pm2.sendDataToProcessId(
          agent.pm_id!,
          {
            type: 'process:msg',
            data: { type: 'checkServerJs' },
            topic: 'agent',
          },
          () => {},
        );
      });
    });
    process.send({
      type: 'process:msg',
      data: {
        success: true,
      },
      topic: 'agent',
    });
  }

  getCacheEntry(): Function {
    return require(this.serverPath);
  }

  removeCacheEntry() {
    cachedFiles.forEach((file) => {
      let path = cacheDir + '/' + file;
      delete require.cache[path];
    });
  }
}
