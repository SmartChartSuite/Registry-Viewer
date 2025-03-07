import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrl: './custom-header.component.scss',
  standalone: false
})
export class CustomHeaderComponent {
  @Input() headerData: any[];
  itemsRendered: boolean = false;
}
