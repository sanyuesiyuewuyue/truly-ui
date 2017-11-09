import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import {DatatableModule} from 'truly-ui/datatable';
import {InputModule} from 'truly-ui/input';

import {DataTableScrollableDemoComponent} from './datatablescrollabledemo.component';
import {DataTableScrollableDemoRoutingModule} from './datatablescrollabledemo-routing.module';

@NgModule({
  declarations: [
    DataTableScrollableDemoComponent
  ],
  imports: [
    CommonModule,
    DataTableScrollableDemoRoutingModule,
    DatatableModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
  ],
  exports: [
    DataTableScrollableDemoComponent
  ]
})
export class DatatableScrollableDemoModule {}
