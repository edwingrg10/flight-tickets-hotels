import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditTravelerComponent } from '../add-or-edit-traveler/add-or-edit-traveler.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert2';
import { AddOrEditStepTwoComponent } from '../add-or-edit-stepTwo/add-or-edit-stepTwo.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-form-tickets-hotels',
  templateUrl: './form-tickets-hotels.component.html',
  styleUrls: ['./form-tickets-hotels.component.css']
})
export class FormTicketsHotelsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  travellers: any[] = [];
  itemsStepTwo: any[] = [];
  dataSourceTravellers: any;
  displayedColumnsTravellers: string[] = ['name', 'lastName', 'identificationType', 'identification', 'phone', 'birthDate', 'hasHoldSuitcase', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginatorTravellers!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortTravellers!: MatSort;

  dataSourceItemsTwo: any;
  displayedColumnsItemsTwo: string[] = ['afeCC', 'account', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginatorItemsTwo!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortItemsTwo!: MatSort;
  cities: any;
  airports: any;
  airlines: any[] = ['Avianca', 'Wingo', 'EasyFly', 'SATENA', 'LATAM', 'Regional Express Americas SAS']
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private flightsService: FlightsService
  ) { }

  ngOnInit() {
    this.getCitiesColombia();
    this.getAirportsColombia();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      typeTravel: ['', Validators.required],
      travellers: [null, Validators.required],
      addStep2: [null, [Validators.required]],
      purposeTravel: ['', Validators.required],
      flightDate: [null, [Validators.required]],
      flightFrom: [null, [Validators.required]],
      flightTo: [null, [Validators.required]],
      flightAirline: [null, [Validators.required]],
      flightTime: [null, [Validators.required]],
      hotelCC: [null, [Validators.required]],
      hotelAccount: [null, [Validators.required]],
      hotelCity: [null, [Validators.required]],
      hotelDateCheckIn: [null, [Validators.required]],
      hotelDateChockOut: [null, [Validators.required]],
      observations: [null, [Validators.required]],
      applicantName: [null, [Validators.required]]
    });
  }

  getCitiesColombia() {
    this.flightsService.getApiColombia('/City').subscribe(result => {
      this.cities = result;
    }, () => {
    });
  }

  getAirportsColombia() {
    this.flightsService.getApiColombia('/Airport').subscribe(result => {
      this.airports = result;
    }, () => {
    });
  }

  addTraveler(traveler?: any) {
    let dialogRef = this.dialog.open(AddOrEditTravelerComponent, {
      data: traveler ? { traveler } : null,
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (traveler) { // Edición
          const index = this.travellers.indexOf(traveler);
          if (index > -1) {
            this.travellers[index] = result;
          }
        } else { // Creación
          this.travellers.push(result);
        }
        this.form.controls['travellers'].setValue(this.travellers);
        this.dataSourceTravellers = new MatTableDataSource<any>(this.travellers);
        this.dataSourceTravellers.paginator = this.paginatorTravellers;
        this.dataSourceTravellers.sort = this.sortTravellers;
      }
    });
  }

  deleteTraveler(traveler: any) {
    swal.fire({
      title: '¿Está seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#27499b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        traveler['loading'] = true;
        const index = this.travellers.indexOf(traveler);
        if (index > -1) {
          this.travellers.splice(index, 1);
          this.form.controls['travellers'].setValue(this.travellers);
          this.dataSourceTravellers = new MatTableDataSource<any>(this.travellers);
          this.dataSourceTravellers.paginator = this.paginatorTravellers;
          this.dataSourceTravellers.sort = this.sortTravellers;
        }
      }
    });
  }

  addStep2(item?: any) {
    let dialogRef = this.dialog.open(AddOrEditStepTwoComponent, {
      data: item ? { item } : null,
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (item) { // Edición
          const index = this.itemsStepTwo.indexOf(item);
          if (index > -1) {
            this.itemsStepTwo[index] = result;
          }
        } else { // Creación
          this.itemsStepTwo.push(result);
        }
        this.form.controls['addStep2'].setValue(this.itemsStepTwo);
        this.dataSourceItemsTwo = new MatTableDataSource<any>(this.itemsStepTwo);
        this.dataSourceItemsTwo.paginator = this.paginatorItemsTwo;
        this.dataSourceItemsTwo.sort = this.sortItemsTwo;
      }
    });
  }

  deleteStepTwo(item: any) {
    swal.fire({
      title: '¿Está seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#27499b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        item['loading'] = true;
        const index = this.itemsStepTwo.indexOf(item);
        if (index > -1) {
          this.itemsStepTwo.splice(index, 1);
          this.form.controls['addStep2'].setValue(this.itemsStepTwo);
          this.dataSourceItemsTwo = new MatTableDataSource<any>(this.itemsStepTwo);
          this.dataSourceItemsTwo.paginator = this.paginatorItemsTwo;
          this.dataSourceItemsTwo.sort = this.sortItemsTwo;
        }
      }
    });
  }

  finishForm() {

  }

}
