import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteWalletComponent } from './delete-wallet/delete-wallet.component';
import { FundAccountComponent } from './fund-account/fund-account.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestFundsComponent } from './request-funds/request-funds.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TestpageComponent } from './testpage/testpage.component';
import { TransferComponent } from './transfer/transfer.component';
import { WalletsComponent } from './wallets/wallets.component';
import { WithdrawWalletComponent } from './withdraw-wallet/withdraw-wallet.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'sign-in',component:SignInComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'profile',component:ProfileComponent},
  {path:'payments',component:PaymentsComponent},
  {path:'messages',component:MessagesComponent},
  {path:'dashboard',component:DashboardComponent,children:[
    {path:'fund-account',component:FundAccountComponent},
    {path:'transfer',component:TransferComponent},
    {path:'create-wallet',component:CreateWalletComponent},
    // {path:'fund-wallet/:i',component:FundWalletComponent},
    // {path:'withdraw-wallet/:i',component:WithdrawWalletComponent},
    // {path:'delete-wallet/:i',component:DeleteWalletComponent},
    {path:'request-funds',component:RequestFundsComponent},
  ]},
  {path:'history',component:HistoryComponent},
  {path:'testpage',component:TestpageComponent},
  {path:'wallets',component:WalletsComponent,children:[
    {path:'fund-wallet/:i',component:FundWalletComponent},
    {path:'withdraw-wallet/:i',component:WithdrawWalletComponent},
    {path:'delete-wallet/:i',component:DeleteWalletComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
