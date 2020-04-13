import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
console.log(environment.STUDY_DATA_MANAGER_ADDRESS);
console.log('nothing is printed!');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
