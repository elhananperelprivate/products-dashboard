import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { appRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ProductEffects, productFeature, productReducer } from './data';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
    ),
    provideAnimations(),
    provideAnimationsAsync(),
    provideEffects([ProductEffects]),
    provideStore({ product: productReducer }, {}),
    provideStoreDevtools({
      logOnly: isDevMode(),
      maxAge: 25,
      connectInZone: true,
    }),
  ],
};
