// app.config.server.ts
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServerModule } from '@angular/platform-server';

export const config = {
  providers: [
    importProvidersFrom(FormsModule, ServerModule),
    provideHttpClient(withFetch()),
    provideRouter([])
  ]
};