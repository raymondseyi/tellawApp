import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {

  constructor(public router:Router) { }
  public tellawUsers:Array<any>=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
  public userIndex:any;
  public userArray:any;
  public userFirstName:any;
  public userAccountNumber:any;
  public totalAmount:any;
  public fundButtonClicked:any=0
  public fundAmount:any;
  public transferAmount:any;
  public transferButtonClicked:any=0
  public accountNumberEntered:any;
  public accountNumberTester:any;
  public accountNumberReport:any;
  public transferPartnerAccountIndex:any
  public transferPartnerAccountName:any
  public transferDescription:any
  public nameOfWallet:any=""
  public descriptionOfWallet:any=""
  public targetOfWallet:any;
  public initialWalletAmount:any;
  public walletDetails:any;
  public userWallets:any


  ngOnInit(): void {
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.totalAmount=this.userArray.totalAmount
    this.userWallets=this.tellawUsers[this.userIndex].wallet
  }
  createWallet(){
    var myDate = new Date;
        var days = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
        var month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"]

        var allTime = myDate.getHours() + ":" + myDate.getMinutes() + ":" +  myDate.getSeconds()
        var allDate =   days[myDate.getDay()] + "  "  + myDate.getDate() + "/" + month[myDate.getMonth()] + "/" + myDate.getFullYear()
    if(this.nameOfWallet!=="" && this.descriptionOfWallet!=="" && this.targetOfWallet>=0 && this.targetOfWallet){
      console.log(`wallet created`)
      console.log(this.targetOfWallet)
      this.walletDetails={
        nameOfWallet:this.nameOfWallet,
        descriptionOfWallet:this.descriptionOfWallet,
        targetOfWallet:this.targetOfWallet,
        walletAmount:0,
        dateCreated:allDate,
        timeCreated:allTime,
        walletId: Math.round(Math.random()*10000),
        history:[]
      }
      this.tellawUsers[this.userIndex].wallet.push(this.walletDetails)
      console.log(this.tellawUsers)
      localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
      alert(`Wallet Created Successfully`)
      this.router.navigate(['/dashboard'])
    }
    
  }
  cancelWallet(){
    this.router.navigate(['/dashboard'])
  }
}
