import { Component } from '@angular/core';
import { environment } from '../environments/environment.staging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'esquilo-money';
  env = environment;
}