import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../envionments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss'
})
export class AllTodosComponent implements OnInit {
  allTodos: any = []
  error: string | undefined;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    try {
      this.allTodos = await this.getTodos()
    } catch (e) {
      this.error = 'Fehler'
    }
  }


  async getTodos() {
    const url = environment.baseUrl + '/todos/'
    const options = {
      headers: new HttpHeaders({ 'Authorization': `token ${localStorage.getItem('token')}` })
    }
    return lastValueFrom(this.http.get(url, options))
  }
}