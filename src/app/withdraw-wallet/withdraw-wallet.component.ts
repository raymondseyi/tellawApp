import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-withdraw-wallet',
  templateUrl: './withdraw-wallet.component.html',
  styleUrls: ['./withdraw-wallet.component.css']
})
export class WithdrawWalletComponent implements OnInit {

  constructor(public actRoute:ActivatedRoute, public router:Router) { }
  public tellawUsers:Array<any>=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
  public userIndex:any;
  public userArray:any;
  public userFirstName:any;
  public userAccountNumber:any;
  public totalAmount:any;
  public walletId:any;
  public withdrawalAmount:any;
  public referenceNumber:any;
  public withdrawWalletHistory:any
  public walletName:any
  ngOnInit(): void {
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.totalAmount=this.tellawUsers[this.userIndex].totalAmount
    this.actRoute.paramMap.subscribe(anyname=>{
      this.walletId = anyname.get("i")
    })
    this.walletName = this.tellawUsers[this.userIndex].wallet[this.walletId].nameOfWallet
    console.log(this.walletId);
    
  }
  withdrawWallet(){
    if(this.withdrawalAmount>0 && this.withdrawalAmount<=this.tellawUsers[this.userIndex].wallet[this.walletId].walletAmount){
      //Initialise date and time display settings
      var myDate = new Date;
      var days = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
      var month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"]

      var allTime = myDate.getHours() + ":" + myDate.getMinutes() + ":" +  myDate.getSeconds()
      var allDate =   days[myDate.getDay()] + "  "  + myDate.getDate() + "/" + month[myDate.getMonth()] + "/" + myDate.getFullYear()
      //Add Entered Amount to the Main Account Wallet
      this.tellawUsers[this.userIndex].mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount + parseFloat(this.withdrawalAmount)
      //Remove Entered Amount from Wallet
      this.tellawUsers[this.userIndex].wallet[this.walletId].walletAmount=this.tellawUsers[this.userIndex].wallet[this.walletId].walletAmount-parseFloat(this.withdrawalAmount)
      //Generate Reference number
      this.referenceNumber = Math.round(Math.random()*10000000000000000)
      //Push to history
      this.withdrawWalletHistory = {
       nameOfReceiver: "Raymond Bank",
       accountNumberOfReceiver:"Debit Card Number",
       date:allDate,
       time:allTime,
       description:`withdrawal from ${this.walletName} wallet`,
       transferAmount:parseFloat(this.withdrawalAmount),
       transactionType:'credit',
       referenceNumber:this.referenceNumber
     }
     this.tellawUsers[this.userIndex].history.push(this.withdrawWalletHistory)
      //push to local storage
      localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
      alert(`Withdraw was successful`)
      this.router.navigate(["/dashboard"])
      console.log(this.tellawUsers)
    }
    
  }
  cancelWithdraw(){
    this.router.navigate(["/dashboard"])
  }
}
