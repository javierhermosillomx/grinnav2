import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // isLoading = false;
  name: string;
  email: string;
  password: string;

  constructor(public authService: AuthService) {}

  onSingupSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.authService.createUser(form.value.name, form.value.email, form.value.password, 'admin');
  }
}
