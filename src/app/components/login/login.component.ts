import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../envionments/environment';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = ''
  password: string = ''
  constructor(private router: Router, private http: HttpClient) { }


  async login() {
    try {
      let resp: any = await this.loginWithUsernameAndPassword(this.username, this.password);
      localStorage.setItem('token', resp['token']);
      this.router.navigateByUrl('/todos');
    } catch (e) {
      alert('Login fehlgeschlagen!');
    }
  }

  loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/'
    const body = {
      username: username,
      password: password,
    };

    return lastValueFrom(this.http.post(url, body));
  }
}
