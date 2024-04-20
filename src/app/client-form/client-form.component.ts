import { Component, NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../form-data.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClientFormModule {}

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrl: './client-form.component.css',
})
export class ClientFormComponent {
  clientForm = this.formBuilder.group({
    prenom: ['', Validators.required],
    nom: ['', Validators.required],
    civilite: ['', Validators.required],
    address: this.formBuilder.group({
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
    }),
    email: ['', Validators.required],
    phone: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
  }, { validator: this.passwordMatchValidator });

  constructor(private formBuilder: FormBuilder, private router: Router, private formDataService: FormDataService) {}

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const passwordConfirm = formGroup.get('passwordConfirm')?.value;

    if (password !== passwordConfirm) {
      formGroup.get('passwordConfirm')?.setErrors({ passwordMismatch: true });
      return { 'passwordMismatch': true };
    }

    return null;
  }
  onSubmit() {
    console.warn(this.clientForm.value);
    // Stock les données dans le service
    this.formDataService.setFormData(this.clientForm.value);
    // Redirige vers la page de profil après la validation
    this.router.navigate(['/profile']);
  }

  updateProfile() {
    this.clientForm.patchValue({
      nom: 'Nouveau nom',
      prenom: 'Nouveau prenom',
      civilite: '',
      address: {
        rue: 'Nouvelle rue',
        codePostal: 'Nouveau code postal',
        ville: 'Nouvelle ville',
        pays: 'Nouveau pays'
      },
      email: 'Nouveau email',
      phone: 'Nouveau téléphone',
      login: 'Nouveau login',
      password: 'Nouveau mot de passe',
    });
  }
}