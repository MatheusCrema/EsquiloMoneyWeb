import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Config } from './config';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ]
  //styleUrls: ['']
})
export class ConfigComponent implements OnInit {

  config: Config;
  headers: string[];

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }


  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
        categoriasUrl: (data as any).categoriasUrl
      });
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }
}



