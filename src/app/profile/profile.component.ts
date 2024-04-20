import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileData: any;

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {
    // Récupérer les données du service
    this.profileData = this.formDataService.getFormData();
  }
}
