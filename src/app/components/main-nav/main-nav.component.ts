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
    
    mesLista[0] = 'Janeiro';
    mesLista[1] = 'Fevereiro';
    mesLista[2] = 'Março';
    mesLista[3] = 'Abril';
    mesLista[4] = 'Maio';
    mesLista[5] = 'Junho';
    mesLista[6] = 'Julho';
    mesLista[7] = 'Agosto';
    mesLista[8] = 'Setembro';
    mesLista[9] = 'Outubro';
    mesLista[10] = 'Novembro';
    mesLista[11] = 'Dezembro';
    
    var mes = mesLista[d.getMonth()];
    
   return mes;
}


}
