import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}



  getMes() {
    
    var d = new Date();
    var mesLista = new Array();
    
    mesLista[0] = 'January';
    mesLista[1] = 'February';
    mesLista[2] = 'March';
    mesLista[3] = 'April';
    mesLista[4] = 'May';
    mesLista[5] = 'June';
    mesLista[6] = 'July';
    mesLista[7] = 'August';
    mesLista[8] = 'September';
    mesLista[9] = 'October';
    mesLista[10] = 'November';
    mesLista[11] = 'December';
    
    var mes = mesLista[d.getMonth()];
    
   return mes;
}


}
