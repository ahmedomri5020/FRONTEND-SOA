import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

// Add toastr and animations providers to the appConfig.providers
appConfig.providers = [
  ...appConfig.providers,   // Preserve existing providers
  provideAnimations(),      // Add animations provider
  provideToastr(),          // Add toastr provider
];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
