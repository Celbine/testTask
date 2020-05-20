import express, { Express } from 'express';
import * as http from 'http';
import middleware from './middlewares/express.middleware';

export default class ServerRun {
  private readonly port: number;

  private readonly app: Express;

  private server: http.Server;

  public constructor(port: number) {
    this.port = port;
    this.app =  express();
  }

  public start() {
    try {
      this.server = http.createServer(this.app);
      middleware(this.app);
      this.server.listen(this.port, () => {
          console.log(`Server ready on port [${this.port}]`);
        });
    } catch (e) {
      console.error(e);
    }
  }
}
