import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ProgressBarService {
    public onProgressChanged: EventEmitter<string> =  new EventEmitter();

    private requestsRunning = 0;

    public list(): number {
        return this.requestsRunning;
    }

    public increase(): void {
        this.requestsRunning++;
        if (this.requestsRunning === 1) {
            this.onProgressChanged.emit('query');
        }
    }

    public decrease(): void {
        if (this.requestsRunning > 0) {
            this.requestsRunning--;
            if (this.requestsRunning === 0) {
                this.onProgressChanged.emit('none');
            }
        }
    }
}
