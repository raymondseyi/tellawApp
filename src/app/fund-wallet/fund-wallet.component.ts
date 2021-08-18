import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.css']
})
export class FundWalletComponent implements OnInit {

  constructor(public actRoute:ActivatedRoute,public router:Router) { }
  
  public userIndex:any;
  public userArray:any;
  public userFirstName:any;
  public userAccountNumber:any;
  public totalAmount:any;
  public walletId:any;
  public amountToFund:any;
  public walletName:any
  public mainAccountAmount:any
  public fundWalletHistory:any
  public referenceNumber:any
  public tellawUsers:any
  ngOnInit(): void {
    this.tellawUsers=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount
    this.totalAmount=this.tellawUsers[this.userIndex].totalAmount
    this.actRoute.paramMap.subscribe(anyname=>{
      this.walletId = anyname.get("i")
    })
    this.walletName = this.tellawUsers[this.userIndex].wallet[this.walletId].nameOfWallet
    console.log(this.walletId)
  }
  fundWallet(){
    if(this.amountToFund>0 && this.amountToFund<=this.tellawUsers[this.userIndex].mainAccountAmount){
       //Initialise date and time display settings
    var myDate = new Date;
    var allTime = myDate.toLocaleTimeString()
    var allDate =  myDate.toLocaleDateString()
      //Add to the wallet the Amount Entered
       this.tellawUsers[this.userIndex].wallet[this.walletId].walletAmount= this.tellawUsers[this.userIndex].wallet[this.walletId].walletAmount+ parseFloat(this.amountToFund)
       //Subtract from the main account the Amount Entered
       this.tellawUsers[this.userIndex].mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount - parseFloat(this.amountToFund)
       //Generate Reference number
       this.referenceNumber = Math.round(Math.random()*10000000000000000)
       //Push to history
       this.fundWalletHistory = {
        nameOfReceiver: "Raymond Bank",
        accountNumberOfReceiver:"Debit Card Number",
        date:allDate,
        time:allTime,
        description:`${this.walletName} wallet funded`,
        transferAmount:parseFloat(this.amountToFund),
        transactionType:'debit',
        referenceNumber:this.referenceNumber
      }
      this.tellawUsers[this.userIndex].history.push(this.fundWalletHistory)
      //push to local storage
       localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
    console.log(this.tellawUsers)
    alert(`account funded successfully`)
    this.ngOnInit()
    // this.router.navigate(["/wallets"])
    }
  
  }
  cancelFund(){
    this.router.navigate(["/wallets"])

  }

}
