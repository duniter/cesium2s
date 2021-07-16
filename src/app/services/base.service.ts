import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {environment} from "../../environments/environment";

@Injectable()
export abstract class AppBaseService {

  private readonly _debug: boolean;
  private readonly _logPrefix: string = null;

  private _started = false;
  private _startPromise: Promise<void> = null;


  get started(): boolean {
    return this._started;
  }

  protected constructor(protected platform: Platform, opts?: {
    logPrefix?: string;
    name?: string;
  }) {
    this._debug = !environment.production;
    this._logPrefix = (opts && opts.logPrefix) || ("[" + (opts && opts.name || 'base-service') + "] ");
  }

  start(): Promise<any> {
    if (this._startPromise) return this._startPromise;
    if (this._started) return Promise.resolve();

    this._started = false;
    const now = Date.now();
    this.info('Starting service...');

    this._startPromise = this.platform.ready()
      .then(() => this.doStart())
      .then((result: any) => {
        this._started = true;
        this._startPromise = undefined;
        this.info(`Starting service [OK] in ${Date.now() - now}ms`);
        return result;
      })
      .catch((err) => {
        this.error('Cannot start:', err);
        throw err; // Rethrow
      });

    return this._startPromise;
  }

  ready(): Promise<boolean> {
    if (this._started) return Promise.resolve(true);
    return this.start()
      .then((_) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  }

  protected abstract doStart(): Promise<any>;

  protected debug(msg, ...params: any[]) {
    if (this._debug) console.debug(this._logPrefix + msg, params);
  }
  protected info(msg, ...params: any[]) {
    console.info(this._logPrefix + msg, params);
  }
  protected warn(msg, ...params: any[]) {
    console.warn(this._logPrefix + msg, params);
  }
  protected error(msg, ...params: any[]) {
    console.error(this._logPrefix + msg, params);
  }
}
