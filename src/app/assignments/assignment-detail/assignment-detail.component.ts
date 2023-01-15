import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis!: Assignment|undefined ;
  nomAssignment:string="";
  dateDeRendu!:Date;
  note!:number;
  rendu!: boolean;
  etat = true;
  title = 'Gestion des assignments';

  constructor(private assignmentsService: AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService) {}

  // Appelé AVANT l'affichage du composant, fait partie du
  // cycle de vie du composant
  ngOnInit(): void {
    this.getAssignment();
    
  }

  login() {
    console.log()
    if(!this.authService.loggedIn) {
      this.authService.logIn();
      this.authService.isAdmin().then((value:boolean)=>{console.log(value)
      this.etat = value;
      })
    } else {
      this.authService.logOut();
      this.authService.isAdmin().then((value:boolean)=>{console.log(value)
      this.etat = value;
    })
    }
  }

  getAssignment() {
    // on récupère l'id dans l'url
    // Le + force la conversion en number
    const id:number = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
    .subscribe((assignment) => {
      this.assignmentTransmis = assignment;
     
      if(!assignment) return;

      this.assignmentTransmis = assignment;
      this.note = assignment.note;
      this.rendu = assignment.rendu;
      console.log(this.note)
      if(this.note == null){
        this.assignmentTransmis.rendu = true;
      }
    });
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;
    this.assignmentTransmis.rendu = true;
    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
        // et on navigue vers la page d'accueil qui affiche
        // la liste des assignments
        this.router.navigate(["/home"]);
      });
    
  }

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return;
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.assignmentTransmis = undefined;
        // et on navigue vers la page d'accueil qui affiche
        // la liste des assignments
        this.router.navigate(["/home"]);
      });
  }
}
