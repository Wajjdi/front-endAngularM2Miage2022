import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

// Pour le formulaire
nomDevoir = "";
nomAuteur = "";
nomMatiere = "";
imgMatiere = "";
imgProf = "";
remarque = "";
note=0
dateDeRendu!:Date;

  constructor(private assignmentsService:AssignmentsService,
              private router:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.imgProf,"ss")
    if(this.nomMatiere == "Grails"){
      this.imgProf = "../../assets/grigri.png"
      this.imgMatiere =  "../../assets/grigri.png"
  }
  else if(this.nomMatiere == "BD"){
    this.imgProf = "../../assets/moi.png"

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
      //this.router.navigate(['/home']);
    });
    


  console.log("onSubmit : " + this.nomDevoir +
  " date de rendu : " + this.dateDeRendu +
  "nomAuteur : " + this.nomAuteur +
  "nomMatiere : " + this.nomMatiere +
  "image" + this.imgProf );
  }


}
