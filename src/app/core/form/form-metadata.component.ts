import { Component, Input } from '@angular/core';
import { Entity } from '../services/model';

// import fade in animation
import { fadeInAnimation } from '../../shared/material/material.animations';

@Component({
    selector: 'form-metadata',
    templateUrl: './form-metadata.component.html',
    styleUrls: ['./form-metadata.component.scss'],
    animations: [fadeInAnimation]
})
export class FormMetadataComponent {

    @Input()
    data: Entity<any>;

}