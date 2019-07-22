import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Entity} from '../services/model';
// import fade in animation
import {fadeInAnimation} from '../../shared/material/material.animations';

@Component({
  selector: 'entity-metadata',
  templateUrl: './entity-metadata.component.html',
  styleUrls: ['./entity-metadata.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityMetadataComponent {

  @Input()
  value: Entity<any>;

}
