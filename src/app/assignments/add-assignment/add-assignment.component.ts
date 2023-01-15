import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  
  
title = 'Gestion des assignments';
etat = false;
// Pour le formulaire
nomDevoir = "";
nomAuteur = "";
nomMatiere = "";
imgMatiere = "";
imgProf = "";
remarque = "";
note=0
dateDeRendu!:Date;

  constructor(private assignmentsService:AssignmentsService, private router:Router,
    private route:ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.etatConnection();
  }
 
  onSubmit(){
    console.log(this.imgProf,"ss")
    if(this.nomMatiere == "Grails"){
      this.imgProf = "../../../assets/moi.png"
      this.imgMatiere =  "../../../assets/grails.png"
  }
  if(this.nomMatiere == "BD"){
    this.imgProf = "../../assets/moi.png"
    this.imgMatiere =  "../../../assets/bd.jpg"
  }
 if(this.nomMatiere == "Technologie"){
    this.imgProf = "../../../assets/elon.jpg"
    this.imgMatiere =  "../../../assets/technologie.png"
  }
  if(this.nomMatiere == "Football"){
    this.imgProf = "../../../assets/guardiola.jpg"
    this.imgMatiere =  "../../../assets/foot.jpg"
  }
  
    
    // On ajoute un nouvel assignment
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.id = Math.floor(Math.random()*100000000000000000);
    nouvelAssignment.nomAuteur = this.nomAuteur;
    nouvelAssignment.nomMatiere = this.nomMatiere;
    nouvelAssignment.imgProf = this.imgProf;
    nouvelAssignment.imgMatiere = this.imgMatiere;
    nouvelAssignment.remarque = this.remarque;
    nouvelAssignment.note = this.note;

    // le tableau est chez le papa comment faire ?
    //this.assignments.push(nouvelAssignment);

    //this.nouvelAssignment.emit(nouvelAssignment);
    this.assignmentsService.addAssignment(nouvelAssignment)
    .subscribe((reponse) => {
      console.log(reponse.message);
      // ON VA DEVOIR NAVIGUER AVEC LE ROUTER
      // VERS LE COMPOSANT QUI AFFICHE LA LISTE
      this.router.navigate(["/home"]);
    });
    


  console.log("onSubmit : " + this.nomDevoir +
  " date de rendu : " + this.dateDeRendu +
  "nomAuteur : " + this.nomAuteur +
  "nomMatiere : " + this.nomMatiere +
  "image" + this.imgProf );
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
  etatConnection(): boolean {
    this.authService.isAdmin().then((value: boolean) => {
      console.log(value)
      this.etat = value;
    })
    return this.etat;
  }


}
