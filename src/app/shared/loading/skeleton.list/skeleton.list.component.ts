import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-list',
  templateUrl: './skeleton.list.component.html',
  styleUrls: ['./skeleton.list.component.css'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class AppSkeletonListComponent implements OnInit {
  protected items: number[];

  @Input() size = 3;
  @Input() avatar = false;

  constructor() {}

  ngOnInit() {
    this.items = Array(+this.size);
  }
}
