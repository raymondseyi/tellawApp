import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {

  constructor(public router:Router) { }
  public modal:any=true
  public tellawUsers:any
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
  public userWallets:any
  public mainAccountAmount:any;
  public clickedWalletIndex:any
  public walletName:any
  public referenceNumber:any
  public amountToFund:any
  public fundWalletHistory:any
  public nameOfWallet:any=""
  public descriptionOfWallet:any=""
  public targetOfWallet:any;
  public initialWalletAmount:any;
  public walletDetails:any;
 
  ngOnInit(): void {
    this.tellawUsers =localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.totalAmount=this.tellawUsers[this.userIndex].totalAmount
    this.userWallets=this.tellawUsers[this.userIndex].wallet
    this.mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount
    this.amountToFund=""
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.totalAmount=this.userArray.totalAmount
    this.userWallets=this.tellawUsers[this.userIndex].wallet
    
  }
  fundW(i:any){
    this.clickedWalletIndex=i
    console.log(i)
    this.walletName = this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].nameOfWallet
    // this.router.navigate([`/wallets/fund-wallet/${i}`])
  }
  withdrawW(i:any){
    this.clickedWalletIndex=i
    this.walletName = this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].nameOfWallet
    // this.router.navigate([`/wallets/withdraw-wallet/${i}`])
  }
  deleteW(i:any){
    this.clickedWalletIndex=i
    this.walletName = this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].nameOfWallet
    // this.router.navigate([`/wallets/delete-wallet/${i}`])
  }
  fundWallet(){
    // this.amountToFund=""
    if(this.amountToFund>0 && this.amountToFund<=this.tellawUsers[this.userIndex].mainAccountAmount){
       //Initialise date and time display settings
    var myDate = new Date;
    var allTime = myDate.toLocaleTimeString()
    var allDate =  myDate.toLocaleDateString()
      //Add to the wallet the Amount Entered
       this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].walletAmount= this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].walletAmount+ parseFloat(this.amountToFund)
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
       this.ngOnInit()
    console.log(this.tellawUsers)
   
    // this.amountToFund=0
    alert(`done`)
    // this.router.navigate([`/wallets`])
    }
  
  }

  withdrawWallet(){
    if(this.amountToFund>0 && this.amountToFund<=this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].walletAmount){
       //Initialise date and time display settings
       var myDate = new Date;
       var allTime = myDate.toLocaleTimeString()
       var allDate =  myDate.toLocaleDateString()
      //Add Entered Amount to the Main Account Wallet
      this.tellawUsers[this.userIndex].mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount + parseFloat(this.amountToFund)
      //Remove Entered Amount from Wallet
      this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].walletAmount=this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].walletAmount-parseFloat(this.amountToFund)
      //Generate Reference number
      this.referenceNumber = Math.round(Math.random()*10000000000000000)
      //Push to history
      this.fundWalletHistory = {
       nameOfReceiver: "Raymond Bank",
       accountNumberOfReceiver:"Debit Card Number",
       date:allDate,
       time:allTime,
       description:`withdrawal from ${this.walletName} wallet`,
       transferAmount:parseFloat(this.amountToFund),
       transactionType:'credit',
       referenceNumber:this.referenceNumber
     }
     this.tellawUsers[this.userIndex].history.push(this.fundWalletHistory)
      //push to local storage
      localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
      this.ngOnInit()
      alert(`Withdrawal was successful`)
      console.log(this.tellawUsers)
    }
    
  }
  deleteWallet()
  {
    if(this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].walletAmount>0)
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
        this.fundWalletHistory = 
        {
          nameOfReceiver: "Raymond Bank",
          accountNumberOfReceiver:"Debit Card Number",
          date:allDate,
          time:allTime,
          description:`Withdrawal from ${this.walletName} wallet`,
          transferAmount:this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].walletAmount,
          transactionType:'credit',
          referenceNumber:this.referenceNumber
        }
        this.tellawUsers[this.userIndex].history.push(this.fundWalletHistory)
        //Remove Amount from wallet and send to Main Wallet
        this.tellawUsers[this.userIndex].mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount + this.tellawUsers[this.userIndex].wallet[this.clickedWalletIndex].walletAmount
      }
    //Delete Wallet from list of wallets
    this.tellawUsers[this.userIndex].wallet = this.tellawUsers[this.userIndex].wallet.filter((val:any,id:any)=>id!=this.clickedWalletIndex)
    
    //push to local storage
    localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
    this.ngOnInit()
    alert(`Wallet has been deleted`)
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
