import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RadioButtonModule } from 'truly-ui/radiobutton';

import { RadioButtonDemoComponent } from './radiobuttondemo.component';
import { RadioButtonDemoRoutingModule } from './radiobuttondemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  declarations: [
    RadioButtonDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    RadioButtonDemoRoutingModule,
    RadioButtonModule
  ],
  exports: [
    RadioButtonDemoComponent
  ]
})
export class RadioButtonDemoModule {}
