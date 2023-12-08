import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { NetworkService } from '@app/network/network.service';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';

export declare interface PlaygroundState extends AppPageState {
  bar: number;
  foo: string;
}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.page.html',
  //styleUrls: ['./playground.page.scss']
})
export class PlaygroundPage extends AppPage<PlaygroundState> {
  readonly state$ = this._state.select();

  constructor(private network: NetworkService) {
    super();
    this._state.connect(
      // eslint-disable-next-line @rx-angular/no-zone-critical-rxjs-creation-apis
      interval(250),
      (state: PlaygroundState, slide: number) => <Partial<PlaygroundState>>{ bar: state.bar + slide }
    );

    //network.api.consts
  }

  protected async ngOnLoad() {
    return { bar: 0, foo: 'foo' };
  }
}
