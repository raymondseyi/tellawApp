import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fund-account',
  templateUrl: './fund-account.component.html',
  styleUrls: ['./fund-account.component.css']
})
export class FundAccountComponent implements OnInit {

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
  public mainAccountAmount:any
  public fundAccountHistory:any
  public referenceNumber:any
  ngOnInit(): void {
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount
    this.totalAmount=this.userArray.totalAmount
    console.log(this.userFirstName)
  }
    fundMe(){
      console.log(this.fundAmount)
      if(this.fundAmount){
        //Initialise date and time display settings
        var myDate = new Date;
        var days = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
        var month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"]

        var allTime = myDate.getHours() + ":" + myDate.getMinutes() + ":" +  myDate.getSeconds()
        var allDate =   days[myDate.getDay()] + "  "  + myDate.getDate() + "/" + month[myDate.getMonth()] + "/" + myDate.getFullYear()

        //Add money to the main account
        this.tellawUsers[this.userIndex].mainAccountAmount+=parseFloat(this.fundAmount)
        //Add money to the total amount
        this.totalAmount+=parseFloat(this.fundAmount)
        this.userArray.totalAmount=this.totalAmount
        //Generate Reference number
        this.referenceNumber = Math.round(Math.random()*10000000000000000)
        //Push to history
        this.fundAccountHistory = {
          name: "Raymond Bank",
          accountNumber:"Debit Card Number",
          date:allDate,
          time:allTime,
          description:"Debit Card Withdrawal",
          transferAmount:parseFloat(this.fundAmount),
          transactionType:'credit',
          referenceNumber:this.referenceNumber
        }
        this.tellawUsers[this.userIndex].history.push(this.fundAccountHistory)
        //push to local storage
        localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
        alert(`Account Funded Successfully`)
        this.router.navigate(["/dashboard"])
      }
      else{
        alert("Kindly Enter An Amount")
      }
      
    }
    cancelFund(){
      this.router.navigate(["/dashboard"])
    }
}
