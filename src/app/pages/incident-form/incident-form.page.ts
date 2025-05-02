import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton
} from '@ionic/angular/standalone';
import { IncidentService } from 'src/app/services/incident.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular/standalone';

interface User {
  id: string;
  displayName: string;
  userPrincipalName?: string;
}

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.page.html',
  styleUrls: ['./incident-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton
  ]
})
export class IncidentFormPage implements OnInit {

  incident = {
     title: '',
     description: '',
     priority: '',
     assignedTo: ''
   };
   searchQuery = '';
   searchResults: User[] = [];

   constructor(
     private incidentService: IncidentService,
     private authService: AuthService,
     private loadingCtrl: LoadingController,
     private toastCtrl: ToastController
   ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async searchUsers() {
    if (this.searchQuery.length > 2) {
      try {
        this.searchResults = await this.authService.searchPeople(this.searchQuery);
      } catch (error) {
        console.error('Error searching users:', error);
        this.searchResults = [];
      }
    } else {
      this.searchResults = [];
    }
  }

  selectUser(user: User) {
    this.incident.assignedTo = user.id;
    this.searchQuery = user.displayName;
    this.searchResults = [];
  }

   async onSubmit() {
     const loading = await this.loadingCtrl.create({
       message: 'Submitting incident...'
     });
     await loading.present();

     try {
       await this.incidentService.createIncident(this.incident);
       const toast = await this.toastCtrl.create({
         message: 'Incident created successfully',
         duration: 2000,
         color: 'success'
       });
       await toast.present();
     } catch (error) {
       const toast = await this.toastCtrl.create({
         message: 'Error creating incident',
         duration: 2000,
         color: 'danger'
       });
       await toast.present();
     } finally {
       await loading.dismiss();
     }
   }
}
