import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataFormService } from "./dataform.service";

@Component( {
  selector: 'new-person',
  templateUrl: './newperson.html',
  styleUrls: [ './newperson.component.scss' ]
} )
export class NewPerson implements OnInit, OnChanges {

  @Input() input ='21122112';

  private person;

  private data;

  private dataBasic;

  constructor(public formDataService: DataFormService) {}

  ngOnInit() {
    this.data = [
      { textItem : 'Male', valueItem : 'M' },
      { textItem : 'Female', valueItem : 'F' },
    ];
    this.dataBasic =
      [
        { source: { id: 1, firstName: 'William', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } },
        { source: { id: 1, firstName: 'Maria', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } },
        { source: { id: 1, firstName: 'Andrea', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } },
        { source: { id: 1, firstName: 'Fred', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } },
        { source: { id: 1, firstName: 'Laura', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } }
        ,
      ];

    this.person = this.formDataService.getDataForm();
  }


  ngOnChanges(data: SimpleChanges) {
    console.log(data);
  }


  changess() {
    console.log('add');
  }


  onCheckRadio() {
    alert('Temainfo')
  }
}
