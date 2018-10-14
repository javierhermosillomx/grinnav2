import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
    ) {}

  onLoginSubmit( form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.authService.login(form.value.username, form.value.password);

    this.authService.login(form.value.username, form.value.password).subscribe(data => {
      if (data.success) {
        this.authService.saveAuthData(data.token, data.user, data.expiresIn);
        this.router.navigate(['/']);
      } else {
        this.flashMessagesService.show(
          data.msg,
          { cssClass: 'alert-danger', timeout: 5000 }
        );
      }
    });
  }

}
