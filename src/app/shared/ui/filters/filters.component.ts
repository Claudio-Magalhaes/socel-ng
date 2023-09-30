import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'custom-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() group: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
