import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment!:Assignment|undefined;
  // Pour les champs de formulaire
  nomAssignment:string="";
  dateDeRendu!:Date;
  note!:number;
  nomMatiere!:string;
  nomAuteur!:string;
  remarque!:string;

  etat = true;
  title = 'Gestion des assignments';


  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
              private route:ActivatedRoute,private authService:AuthService) { }

  ngOnInit(): void {
    // Exemple de récupération de ce qui suit le ? dans l'URL

    // fragment (ce qui suit le # dans l'URL)
    const fragment = this.route.snapshot.fragment;

    console.log("fragment: " + fragment);
    console.log(this.route.snapshot.queryParams);

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
      if(!assignment) return;

      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.note = assignment.note;
      this.nomMatiere = assignment.nomMatiere;
      this.nomAuteur = assignment.nomAuteur;
      this.remarque = assignment.remarque;

    });
  }
  onSaveAssignment() {
    if(!this.nomAssignment || !this.dateDeRendu) return;
    if(!this.assignment) return;

    // On modifie l'assignment
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.note = this.note;
    this.assignment.nomMatiere = this.nomMatiere;
    this.assignment.nomAuteur = this.nomAuteur;
    this.assignment.remarque = this.remarque;
    // On envoie l'assignment modifié au service
    // qui va faire la requête HTTP
    // On va naviguer vers la page d'accueil
    this.assignmentsService.updateAssignment(this.assignment)
    .subscribe((reponse) => {
      console.log(reponse.message);
      // et on navigue vers la page d'accueil qui affiche
      // la liste des assignments
      this.router.navigate(["/home"]);
    });
  }
}
