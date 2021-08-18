import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-wallet',
  templateUrl: './delete-wallet.component.html',
  styleUrls: ['./delete-wallet.component.css']
})
export class DeleteWalletComponent implements OnInit {

  constructor(public router:Router, public actRoute:ActivatedRoute) { }
  public tellawUsers:Array<any>=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
  public userIndex:any;
  public userArray:any;
  public userFirstName:any;
  public userAccountNumber:any;
  public totalAmount:any;
  public walletId:any;
  public amountToFund:any;
  public walletName:any
  public mainAccountAmount:any;
  public referenceNumber:any;
  public deleteWalletHistory:any
  ngOnInit(): void {
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.totalAmount=this.tellawUsers[this.userIndex].totalAmount
    this.mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount
    this.actRoute.paramMap.subscribe(anyname=>{
      this.walletId = anyname.get("i")
    })
    this.walletName = this.tellawUsers[this.userIndex].wallet[this.walletId].nameOfWallet
    console.log(this.walletId)
  }
  deleteWallet()
  {
    if(this.tellawUsers[this.userIndex].wallet[this.walletId].walletAmount>0)
      {
        //Initialise date and time display settings
        var myDate = new Date;
        var days = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
        var month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"]

        var allTime = myDate.getHours() + ":" + myDate.getMinutes() + ":" +  myDate.getSeconds()
        var allDate =   days[myDate.getDay()] + "  "  + myDate.getDate() + "/" + month[myDate.getMonth()] + "/" + myDate.getFullYear()
        //Generate Reference number
        this.referenceNumber = Math.round(Math.random()*10000000000000000)
        //Push to history
        this.deleteWalletHistory = 
        {
          nameOfReceiver: "Raymond Bank",
          accountNumberOfReceiver:"Debit Card Number",
          date:allDate,
          time:allTime,
          description:`withdrawal from ${this.walletName} wallet`,
          transferAmount:this.tellawUsers[this.userIndex].wallet[this.walletId].walletAmount,
          transactionType:'credit',
          referenceNumber:this.referenceNumber
        }
        this.tellawUsers[this.userIndex].history.push(this.deleteWalletHistory)
        //Remove Amount from wallet and send to Main Wallet
        this.tellawUsers[this.userIndex].mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount + this.tellawUsers[this.userIndex].wallet[this.walletId].walletAmount
      }
    //Delete Wallet from list of wallets
    this.tellawUsers[this.userIndex].wallet = this.tellawUsers[this.userIndex].wallet.filter((val:any,id:any)=>id!=this.walletId)
    //push to local storage
    localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
    alert(`Wallet has been deleted`)
    this.router.navigate(["/dashboard"])
  }
  cancelDelete(){
    this.router.navigate(["/dashboard"])
  }

}
