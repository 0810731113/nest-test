import { Module, HttpModule } from '@nestjs/common';
import { DowngradeService } from './downgrade.service';
import http from 'http';
import https from 'https';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30 * 1000,
      maxRedirects: 5,
      validateStatus(status) {
        return status >= 200 && status <= 400;
      },
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    }),
  ],
  providers: [DowngradeService],
  exports: [DowngradeService],
})
export class DowngradeModule {}
