/*
    MIT License

    Copyright (c) 2017 Temainfo Sistemas

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

import { ChangeDetectorRef, EventEmitter, Injectable, NgZone, SimpleChanges } from '@angular/core';
import { TlDatatable } from '../datatable';
import { DataMetadata } from '../../core/types/datametadata';
import { FilterEventMetadata } from '../metadatas/filter.metadata';
import { DatasourceService } from '../interfaces/datasource.service';
import { TlDatatableFilterService } from './datatable-filter.service';

@Injectable()
export class TlDatatableDataSource implements DatasourceService {

    public onChangeDataSourceEmitter: EventEmitter<any> = new EventEmitter();

    public datasource: any;

    private datatable: TlDatatable;

    constructor( private filterService: TlDatatableFilterService ) {}

    onInitDataSource(datatableInstance) {
        this.datatable = datatableInstance;
        this.getRowsInMemory( 0, this.datatable.rowsPage ).then((res) => {
            this.datasource = res;
            this.datatable.columnService.setColumns();
        });
        this.refreshTotalRows(this.datatable.data);

        this.filterService.onFilter().subscribe(() => {
          this.loadMoreData(0, this.datatable.rowsPage);
        });

    }

    onChangeDataSource( data: SimpleChanges ) {
        const dataChange = data['data'].currentValue;
        if ( ( !data['data'].firstChange ) && dataChange ) {
            this.datasource = dataChange.data;
            this.onChangeDataSourceEmitter.emit(this.datasource);
        }
    }

    loadMoreData(skip: number, take: number, scrolling?: boolean): Promise<boolean> {
        return new Promise(( resolve ) => {
            if (  this.datatable.allowLazy ) {
               this.datatable.loading = true;
               this.datatable.lazyLoad.emit({ skip: skip,  take: take, filters: this.filterService.getFilter() });
               return resolve();
            }
            this.getRowsInMemory( skip, take, scrolling ).then((res) => {
               this.datasource = res;
               this.onChangeDataSourceEmitter.emit(this.datasource);
               return resolve();
            });
        });
    }


    isDataArray( data: any ) {
        return data instanceof Array;
    }

    private getRowsInMemory(skip: number, take: number, scrolling?: boolean): Promise<any> {
        return new Promise((resolve) => {
            let data: any;
            data = this.getData();
            data = this.filterService.filterWithData(data, scrolling);
            this.refreshTotalRows(data);
            data = this.sliceData(data, skip, take);

            resolve( data  );
        });
    }

    private refreshTotalRows( data: any ) {
        if ( this.isDataArray( data ) ) {
            this.datatable.totalRows =  data.length;
            return;
        }
        this.datatable.totalRows = data.total;
    }

    private getData() {
        return this.isDataArray( this.datatable.data ) ? this.datatable.data : ( this.datatable.data as DataMetadata ).data;
    }

    private sliceData(data, skip, take) {
        return (data as Array<any>).slice( skip, take );
    }

}