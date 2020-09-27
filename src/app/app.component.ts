import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vemdaroca-front';

  constructor(public http: HttpClient) {}

  public ping() {
    this.http.get('http://localhost:8080/login')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }
}
