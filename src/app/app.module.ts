import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FundAccountComponent } from './fund-account/fund-account.component';
import { TransferComponent } from './transfer/transfer.component';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import { WithdrawWalletComponent } from './withdraw-wallet/withdraw-wallet.component';
import { DeleteWalletComponent } from './delete-wallet/delete-wallet.component';
import { HistoryComponent } from './history/history.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RequestFundsComponent } from './request-funds/request-funds.component';
import { MessagesComponent } from './messages/messages.component';
import { TestpageComponent } from './testpage/testpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { WalletsComponent } from './wallets/wallets.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentsComponent } from './payments/payments.component';
import { ClipboardModule } from 'ngx-clipboard';
import { TimeagoModule } from 'ngx-timeago';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    FundAccountComponent,
    TransferComponent,
    CreateWalletComponent,
    FundWalletComponent,
    WithdrawWalletComponent,
    DeleteWalletComponent,
    HistoryComponent,
    NavbarComponent,
    RequestFundsComponent,
    MessagesComponent,
    TestpageComponent,
    WalletsComponent,
    ProfileComponent,
    PaymentsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    ClipboardModule,
    TimeagoModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
