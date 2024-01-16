import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { IndexerService } from '@app/network/indexer.service';
import { Block } from '@app/block/block.model';
import { firstValueFrom, Observable } from 'rxjs';
import { isNotNil, isNotNilOrBlank } from '@app/shared/functions';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';

export interface BlockPageState extends AppPageState {
  block: Block;
  height: number;
}

@Component({
  selector: 'app-block-page',
  templateUrl: './block.page.html',
  styleUrls: ['./block.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BlockPage extends AppPage<BlockPageState> implements OnInit {
  @RxStateSelect() block$: Observable<Block>;
  @RxStateSelect() height$: Observable<number>;

  @RxStateProperty() block: Block;
  @RxStateProperty() height: number;

  constructor(
    private indexService: IndexerService,
    activatedRoute: ActivatedRoute
  ) {
    super({
      name: 'block',
      initialState: {
        height: +activatedRoute.snapshot.paramMap.get('height'),
      },
    });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected async ngOnLoad(): Promise<Partial<BlockPageState>> {
    await this.indexService.ready();

    const paramMap = this.activatedRoute.snapshot.paramMap;

    const id = paramMap.get('id');
    const height = +paramMap.get('height');

    let block: Block;
    if (isNotNilOrBlank(id)) {
      block = await firstValueFrom(this.indexService.blockById(id));
    } else if (isNotNil(height)) {
      block = await firstValueFrom(this.indexService.blockByHeight(height));
    } else {
      throw new Error('Missing id or height');
    }

    return { block, height: block.height };
  }
}
