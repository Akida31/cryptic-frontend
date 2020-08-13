// tslint:disable:max-line-length
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, Injectable, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { DesktopComponent } from './desktop/desktop.component';
import { DesktopMenuComponent } from './desktop/desktop-menu/desktop-menu.component';
import { DesktopStartmenuComponent } from './desktop/desktop-startmenu/desktop-startmenu.component';
import { ContextMenuComponent } from './desktop/context-menu/context-menu.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { DesktopGuard } from './desktop/desktop.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PXtoViewWidthPipe } from './pxto-view-width.pipe';
import { PXtoViewHeightPipe } from './pxto-view-height.pipe';
import { WindowFrameComponent } from './desktop/window/window-frame.component';
import { WindowManagerComponent } from './desktop/window-manager/window-manager.component';
import { TestWindowComponent } from './desktop/windows/test-window/test-window.component';
import { TerminalComponent } from './desktop/windows/terminal/terminal.component';
import { WindowPlaceDirective } from './desktop/window/window-place.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MinerComponent } from './desktop/windows/miner/miner.component';
import { SettingsComponent } from './desktop/windows/settings/settings.component';
import { TaskManagerComponent } from './desktop/windows/task-manager/task-manager.component';
import { AccountPageBaseComponent } from './account/account-page-base/account-page-base.component';
import { AccountGuard } from './account/account.guard';
import { DesignModule } from './design/design.module';
import { HardwareShopComponent } from './desktop/windows/hardware-shop/hardware-shop.component';
import { HardwareShopItemComponent } from './desktop/windows/hardware-shop/hardware-shop-item/hardware-shop-item.component';
import { HardwareShopItemListComponent } from './desktop/windows/hardware-shop/hardware-shop-item-list/hardware-shop-item-list.component';
import { HardwareShopHeaderComponent } from './desktop/windows/hardware-shop/hardware-shop-header/hardware-shop-header.component';
import { HardwareShopCartComponent } from './desktop/windows/hardware-shop/hardware-shop-cart/hardware-shop-cart.component';
import { HardwareShopCartItemComponent } from './desktop/windows/hardware-shop/hardware-shop-cart-item/hardware-shop-cart-item.component';
import { HardwareShopSidebarItemComponent } from './desktop/windows/hardware-shop/hardware-shop-sidebar-item/hardware-shop-sidebar-item.component';
import { WalletAppComponent } from './desktop/windows/wallet-app/wallet-app.component';
import { WalletAppHeaderComponent } from './desktop/windows/wallet-app/wallet-app-header/wallet-app-header.component';
import { WalletAppEditComponent } from './desktop/windows/wallet-app/wallet-app-edit/wallet-app-edit.component';
import { WalletAppTransactionComponent } from './desktop/windows/wallet-app/wallet-app-transaction/wallet-app-transaction.component';
import { HardwareShopSidebarComponent } from './desktop/windows/hardware-shop/hardware-shop-sidebar/hardware-shop-sidebar.component';
import { captureException, init, Integrations } from '@sentry/browser';
// tslint:enable:max-line-length

const routes: Routes = [
  { path: '', component: DesktopComponent, canActivate: [DesktopGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AccountGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [AccountGuard] },
  { path: '**', redirectTo: '/' }
];

init({
  dsn: 'https://d61f01637d044bf6a44b9c3deb7e69e9@sentry.the-morpheus.de/14',
  // TryCatch has to be configured to disable XMLHttpRequest wrapping, as we are going to handle
  // http module exceptions manually in Angular's ErrorHandler and we don't want it to capture the same error twice.
  // Please note that TryCatch configuration requires at least @sentry/browser v5.16.0.
  integrations: [
    new Integrations.TryCatch({
      XMLHttpRequest: false,
    }),
  ],
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {

  private static extractError(error): string | Error {
    // Try to unwrap zone.js error.
    // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
    if (error && error.ngOriginalError) {
      error = error.ngOriginalError;
    }

    // We can handle messages and Error objects directly.
    if (typeof error === 'string' || error instanceof Error) {
      return error;
    }

    // If it's http module error, extract as much information from it as we can.
    if (error instanceof HttpErrorResponse) {
      // The `error` property of http exception can be either an `Error` object, which we can use directly...
      if (error.error instanceof Error) {
        return error.error;
      }

      // ... or an`ErrorEvent`, which can provide us with the message but no stack...
      if (error.error instanceof ErrorEvent) {
        return error.error.message;
      }

      // ...or the request body itself, which we can use as a message instead.
      if (typeof error.error === 'string') {
        return `Server returned code ${error.status} with body "${error.error}"`;
      }

      // If we don't have any detailed information, fallback to the request message itself.
      return error.message;
    }

    // Skip if there's no error, and let user decide what to do with it.
    return null;
  }

  handleError(error): void {
    const extractedError = SentryErrorHandler.extractError(error) || 'Handled unknown error';

    // Capture handled exception and send it to Sentry.
    captureException(extractedError);

    // When in development mode, log the error to console for immediate feedback.
    if (!environment.production) {
      console.error(extractedError);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DesktopComponent,
    DesktopMenuComponent,
    DesktopStartmenuComponent,
    ContextMenuComponent,
    SignUpComponent,
    PXtoViewWidthPipe,
    PXtoViewHeightPipe,
    WindowFrameComponent,
    WindowManagerComponent,
    WindowPlaceDirective,
    TestWindowComponent,
    TerminalComponent,
    MinerComponent,
    SettingsComponent,
    TaskManagerComponent,
    AccountPageBaseComponent,
    HardwareShopComponent,
    HardwareShopItemComponent,
    HardwareShopItemListComponent,
    HardwareShopHeaderComponent,
    HardwareShopCartComponent,
    HardwareShopCartItemComponent,
    HardwareShopHeaderComponent,
    HardwareShopItemComponent,
    HardwareShopItemListComponent,
    HardwareShopSidebarItemComponent,
    WalletAppComponent,
    WalletAppHeaderComponent,
    WalletAppEditComponent,
    WalletAppTransactionComponent,
    HardwareShopSidebarComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    ReactiveFormsModule,
    DesignModule
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
