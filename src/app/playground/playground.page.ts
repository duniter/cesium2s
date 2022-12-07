import {Component, Injector} from "@angular/core";
import {RxBasePage} from "@app/playground/rx-base.page";
import {RxState} from "@rx-angular/state";
import {interval, map, mapTo} from "rxjs";


export declare interface PlaygroundState {
  bar: number;
  foo: string;
}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.page.html',
  //styleUrls: ['./playground.page.scss']
  providers: [RxState]
})
export class PlaygroundPage extends RxBasePage<PlaygroundState> {
  readonly state$ = this.state.select();

  constructor(injector: Injector,
              private state: RxState<PlaygroundState>) {
    super(injector);
    state.set({bar: 0, foo: 'foo'})
    const sliceToAdd$ = interval(250)
      .pipe(map((i) => {
        return { bar: 5 * i, foo: 'foo'};
      }));
    state.connect(sliceToAdd$);
  }

  protected ngOnLoad(): Promise<PlaygroundState> {
    return Promise.resolve(undefined);
  }
}
