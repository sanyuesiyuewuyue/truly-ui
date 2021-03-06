import {
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';

@Component({
  selector: 'tl-fa-icon',
  templateUrl: './tl-fa-icon.component.html',
  styleUrls: ['./tl-fa-icon.component.scss']
})
export class TlFaIconComponent implements OnInit, OnChanges {

  @Input() icon: string;

  @Input() style: string;

  @Input() size = '12px';

  @Input() animation: string;

  @Input() color: string;

  @Input() align: string;

  public format: string;

  public PREFIX = 'fa-';

  constructor() { }

  ngOnInit() {
    this.formatClass();
  }

  formatClass() {
    if ( this.style === undefined ) {
      this.style = 'fas';
    }

    this.format = this.style + ' ';
    this.format += this.PREFIX + this.icon;
    this.format += (this.animation) ? ' anim-' + this.animation + ' animated' : '';
    this.format += (this.align) ? ' pull-' + this.align : '';
  }

  ngOnChanges() {
    this.formatClass();
  }

}
