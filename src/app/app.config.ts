import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

export const appConfig = {
  providers: [
    importProvidersFrom(FormsModule),
    provideHttpClient(),
    provideRouter([])
  ]
};