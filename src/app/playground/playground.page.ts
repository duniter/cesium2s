import {Component, Injector} from "@angular/core";
import {RxState} from "@rx-angular/state";
import {interval} from "rxjs";
import {NetworkService} from "@app/network/network.service";
import {BasePage, BasePageState} from "@app/shared/pages/base.page";


export declare interface PlaygroundState extends BasePageState {
  bar: number;
  foo: string;
}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.page.html',
  //styleUrls: ['./playground.page.scss']
})
export class PlaygroundPage extends BasePage<PlaygroundState> {

  readonly state$ = this._state.select();

  constructor(injector: Injector,
              private network: NetworkService) {
    super(injector);
    this._state.connect(
      interval(250),
      (state: PlaygroundState, slide: number) => <Partial<PlaygroundState>>{bar: state.bar + slide});

    //network.api.consts
  }

  protected async ngOnLoad() {
    return {bar: 0, foo: 'foo'};
  }
}
