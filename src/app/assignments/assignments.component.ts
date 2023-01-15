import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import * as e from 'express';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AuthService } from '../shared/auth.service';




@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit {

  title = 'Gestion des assignments';

  hide = false;
  currentItemsToShow = [];
  titre = "Liste des devoirs";
  assignmentSelectionne!: Assignment;
  element = true;
  dateDeRendu = true;
  searchText = '';
  assignments: Assignment[] = [];
  etat = true;
  pageEvent: PageEvent;
  pageSlice: Assignment[] = [];
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu', 'nomAuteur', 'nomMatiere', "note", "remarque", "imgProf", "imgMatiere", "edit"];

  dataSource = new MatTableDataSource(this.pageSlice);

  constructor(private assignmentsService: AssignmentsService, private _liveAnnouncer: LiveAnnouncer, private authService: AuthService) {

  }
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;




  ngOnInit(): void {
    console.log("appelé à l'initialisation du composant");
    this.etatConnection()
    //this.assignmentsService.peuplerBD();
    this.assignmentsService.getAssignments()
      .subscribe(assignments => {
        this.assignments = assignments
        this.pageSlice = this.assignments.slice(0, 10);
        this.dataSource = new MatTableDataSource(this.pageSlice)
      });

  }
  transform(event: Event, args?: any): void {
    if (!args) args = event;
    console.log(event);
    // args = args.toLowerCase();

    // return value.filter((item: any) => {
    //return JSON.stringify(item).toLowerCase().includes(args);
    //  })
  }

  etatConnection(): boolean {
    this.authService.isAdmin().then((value: boolean) => {
      console.log(value)
      this.etat = value;
    })
    return this.etat;
  }


  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      console.log(sortState.direction);
      this.dataSource.sort = this.sort;
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  OnPageChange(event: PageEvent) {

    const startIndex = event.pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize;
    this.pageSlice = this.assignments.slice(startIndex, endIndex)
    this.dataSource = new MatTableDataSource(this.pageSlice)
    this.getAssignment();
  }

  login() {
    console.log()
    if (!this.authService.loggedIn) {
      this.authService.logIn();
      this.authService.isAdmin().then((value: boolean) => {
        console.log(value)
        this.etat = value;
      })
    } else {
      this.authService.logOut();
      this.authService.isAdmin().then((value: boolean) => {
        console.log(value)
        this.etat = value;
      })
    }
  }


  getAssignment() {
    // on récupère l'id dans l'url
    // Le + force la conversion en number
    this.assignmentsService.getAssignments()
      .subscribe((assignment) => {
        if (!assignment) return;

        this.assignments = assignment;

      });
  }


  hideData() {
    this.hide = !this.hide;
    this.assignmentsService.getAssignments()
  }

  assignmentClique(assignment: Assignment) {
    console.log("assignmentClique : " + assignment.nom);
    this.assignmentSelectionne = assignment;
  }



}
