import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnChanges {

  logged: boolean = true;
  title = 'Gimnasio-Front-End';

  ngOnChanges(): void {
    if (sessionStorage.getItem('user_id') == null || sessionStorage.getItem('user_id') == null) {
      this.logged = false;
    } else {
      this.logged = true;
    }
  }

}
