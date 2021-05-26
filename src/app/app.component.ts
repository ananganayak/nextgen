import { Component, Optional, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'app/service/api.service';


@Component({
   selector: 'ai-app',
   template: `<router-outlet></router-outlet>
   			<ngx-loading-bar></ngx-loading-bar>`,
   encapsulation: ViewEncapsulation.None
})

export class GeneAppComponent {
   
   constructor(translate: TranslateService, private apiService: ApiService,) {
      translate.addLangs(['en', 'fr', 'he', 'ru', 'ar', 'zh', 'de', 'es', 'ja', 'ko', 'it', 'hu']);
      translate.setDefaultLang('en');

      const browserLang: string = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

      if(this.apiService.appBrand == "Nxtgen"){
         if(localStorage.getItem("envirounment_ip") == "https://r2d23.nxtgen.com:"){
           localStorage.setItem("envirounment_ip", "https://r2d23.nxtgen.com:");
           localStorage.setItem("location", "Faridabad");
         }else if (localStorage.getItem("envirounment_ip") == "https://r2d22.nxtgen.com:"){
           localStorage.setItem("envirounment_ip", "https://r2d22.nxtgen.com:");
           localStorage.setItem("location", "Ahmedabad");
         }else if (localStorage.getItem("envirounment_ip") == "https://r2d21.nxtgen.com:"){
           localStorage.setItem("envirounment_ip", "https://r2d21.nxtgen.com:");
           localStorage.setItem("location", "Mumbai");
         }else{
           localStorage.setItem("envirounment_ip", "https://r2d2.nxtgen.com:");
           localStorage.setItem("location", "Bangalore");
         }
      }

   }
}
