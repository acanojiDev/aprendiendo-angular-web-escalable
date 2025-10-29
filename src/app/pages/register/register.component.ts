import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formRegister;

  constructor(private formSvc: FormBuilder,
    private auth: AuthService
  ) {
    this.formRegister = this.formSvc.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.formRegister.value);
    this.auth.register(this.formRegister.value as any);
  }

  getError(control: string) {
    switch (control) {
      case 'email':
        if (this.formRegister.controls.email.errors != null &&
          Object.keys(this.formRegister.controls.email.errors).includes('required'))
          return "El campo email es obligatorio";
        else if (this.formRegister.controls.email.errors != null &&
          Object.keys(this.formRegister.controls.email.errors).includes('email'))
          return "El email no es correcto";
        break;
      case 'password':
        if (this.formRegister.controls.password.errors != null &&
          Object.keys(this.formRegister.controls.password.errors).includes('required'))
          return "El campo contraseña es obligatorio"
        break;
      default: return "";
    }
    return "";
  }
}
