import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(public router:Router) { }
  public tellawUsers:Array<any>=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
  public userIndex:any;
  public userArray:any;
  public userFirstName:any;
  public userAccountNumber:any;
  public totalAmount:any;
  public fundButtonClicked:any=0
  public fundAmount:any;
  public transferAmount:any="";
  public transferButtonClicked:any=0
  public accountNumberEntered:any;
  public accountNumberTester:any;
  public accountNumberReport:any;
  public transferPartnerAccountIndex:any
  public transferPartnerAccountName:any
  public transferDescription:any
  public accountNotFound:any
  public transferTester:any;
  public transferHistorySender:any;
  public transferHistoryReceiver:any;
  public mainAccountAmount:any;
  public referenceNumber:any;
  ngOnInit(): void {
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount
    this.totalAmount=this.userArray.totalAmount
    console.log(this.userFirstName)
  }
  transferFund(){
     //Initialise date and time display settings
     var myDate = new Date;
     var allTime = myDate.toLocaleTimeString()
     var allDate =  myDate.toLocaleDateString()

      if(this.transferAmount>0 &&this.tellawUsers[this.userIndex].mainAccountAmount>=this.transferAmount){
        //Add transferred Amount to Receiver's Main Account
        this.tellawUsers[this.transferPartnerAccountIndex].mainAccountAmount+=parseFloat(this.transferAmount)
        //Deduct from Sender's main account
        this.tellawUsers[this.userIndex].mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount-parseFloat(this.transferAmount)
        //Add transferred money to total Receiver's money
        this.tellawUsers[this.transferPartnerAccountIndex].totalAmount+=parseFloat(this.transferAmount)
        //Deduct from Sender's total Amount
        this.tellawUsers[this.userIndex].totalAmount=this.tellawUsers[this.userIndex].totalAmount-parseFloat(this.transferAmount)
        //Generate Reference number
        this.referenceNumber = Math.round(Math.random()*10000000000000000)
        //For Sender
        this.transferHistorySender = {
          name: this.transferPartnerAccountName,
          accountNumber:this.tellawUsers[this.transferPartnerAccountIndex].accountNumber,
          date:allDate,
          time:allTime,
          description:`Transfer to ${this.transferPartnerAccountName}`,
          transferAmount:this.transferAmount,
          transactionType:'debit',
          referenceNumber:this.referenceNumber
        }
        this.tellawUsers[this.userIndex].history.push(this.transferHistorySender)

        //For Receiver
        this.transferHistoryReceiver = {
          name: this.userArray.firstName + " " +this.userArray.lastName,
          accountNumber:this.userAccountNumber,
          date:allDate,
          time:allTime,
          description:`Transfer from  ${this.userArray.firstName}`,
          transferAmount:this.transferAmount,
          transactionType:'credit',
          referenceNumber:this.referenceNumber
        }
        this.tellawUsers[this.transferPartnerAccountIndex].history.push(this.transferHistoryReceiver)
        console.log(this.tellawUsers)
        localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
        alert(`You have transferred successfully`)
        this.router.navigate(['/dashboard'])
      }
     
    }
    canceltransferFund(){
      this.transferButtonClicked=0
      this.router.navigate(["/dashboard"])
    }
    checkAccountNumber(){
      if(this.accountNumberEntered.length===10)
      {
        this.accountNumberTester = this.tellawUsers.find((val:any,i:any)=> this.tellawUsers[i].accountNumber==this.accountNumberEntered)
        // console.log(this.accountNumberTester);
        if(!this.accountNumberTester){
          this.accountNumberReport=0
        }
        else{
          if(this.accountNumberEntered.length==10){
            this.accountNumberReport=1
            this.transferPartnerAccountIndex=this.tellawUsers.indexOf(this.accountNumberTester)
            this.transferPartnerAccountName=this.tellawUsers[this.transferPartnerAccountIndex].firstName + " " + this.tellawUsers[this.transferPartnerAccountIndex].lastName
            console.log(this.transferPartnerAccountName)
          }
          else{
            this.transferPartnerAccountName=""
            this.accountNumberReport=0
            this.accountNotFound=1
          }
          
        }
      }
      else{
        this.transferPartnerAccountName=""
        this.accountNumberReport=0
        this.accountNotFound=1
      }
    }
}
