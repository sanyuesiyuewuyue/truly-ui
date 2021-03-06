/*
    MIT License

    Copyright (c) 2018 Temainfo Software

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

import {ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {ImageLightboxInterface} from './interfaces/image.interface';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'tl-lightbox',
  templateUrl: './lightbox.html',
  styleUrls: ['./lightbox.scss'],
})
export class TlLightbox implements OnInit {

  public isOpen = true;

  public files: ImageLightboxInterface[] = [];

  public file: ImageLightboxInterface;

  public close = new EventEmitter();

  public zoomIn = false;

  public transform = null;

  @HostListener('click')
  onClick() {
    this.close.emit();
  }

  constructor( private changes: ChangeDetectorRef, private sanitizer: DomSanitizer ) {}

  ngOnInit() {}

  init( images: ImageLightboxInterface[], current ) {
    this.files = images;
    this.file = !current ? images[0] : current;
    this.changes.detectChanges();
  }

  zoomInOut() {
    this.zoomIn = !this.zoomIn;
    if ( !this.zoomIn ) {
      this.transform = `translate(0, 0) scale(1)`;
    } else {
      this.transform = 'scale(2)';
    }
  }

  previous($event) {
    this.stopEvent($event);
    if ( this.hasImagesOnRight() ) {
      this.file = this.files.find( ( item ) => ((this.file.index - 1) === item.index));
    }
  }

  next( $event ) {
    this.stopEvent($event);
    if ( this.hasImagesOnLeft() ) {
      this.file = this.files.find( ( item ) => ((this.file.index + 1) === item.index));
    }
  }

  mouseMove($event) {
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    if ( this.zoomIn ) {
      this.transform = `translate(${ -($event.x - target.x)}px, ${ - ($event.y - target.y)}px) scale(${ this.zoomIn ? '2' : '1'})`;
    }
  }

  hasImagesOnLeft() {
    return this.file.index < this.files.length - 1;
  }

  hasImagesOnRight() {
    return this.file.index > 0;
  }

  selectImage( $event, item ) {
    this.stopEvent($event);
    this.file = item;
  }

  stopEvent( $event ) {
    $event.stopPropagation();
  }

  bypassFile( file ) {
    return this.sanitizer.bypassSecurityTrustResourceUrl( file );
  }
}
