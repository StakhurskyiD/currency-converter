// app.config.ts
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig = {
  providers: [
    importProvidersFrom(FormsModule),
    provideHttpClient(withFetch()),
    provideRouter([]),
    provideAnimations(), provideAnimationsAsync()
  ]
};