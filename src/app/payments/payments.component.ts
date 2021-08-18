import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor() { }
  public tellawUsers:any
//  public testserviceSting : any = {name:"hello",dept:"Soft",class:"jss2",email:"hello@jj"}
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
  public referenceNumber:any;
  public fundAccountHistory:any
  public accountNotFound:any
  public accountNumberEnteredLength:any
  public userPassword:any
  public passwordEntered:any
  public requestDetails:any
  public currentArrayOfUsers:any
  public transferHistoryReceiver:any
  public transferHistorySender:any
  ngOnInit(): void {
    this.tellawUsers=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.currentArrayOfUsers= this.tellawUsers.filter((val:any,i:any)=>i!=this.userIndex)
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.totalAmount=this.tellawUsers[this.userIndex].totalAmount
    this.userWallets=this.tellawUsers[this.userIndex].wallet
    this.mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount
    console.log(this.currentArrayOfUsers)
    this.accountNumberEnteredLength=this.accountNumberEntered.length
    this.userPassword=this.tellawUsers[this.userIndex].password
  }
  checkAccountNumber(){
    this.ngOnInit()
    this.accountNumberTester = this.tellawUsers.find((val:any,i:any)=> this.tellawUsers[i].accountNumber==this.accountNumberEntered)
    console.log( this.accountNumberTester)
    if(!this.accountNumberTester){
      console.log(`account does not exist`)
      this.transferPartnerAccountName=`Account Not Found`
    }
    else{
      console.log(`account exists`)
      this.transferPartnerAccountIndex=this.tellawUsers.indexOf(this.accountNumberTester)
          this.transferPartnerAccountName=this.tellawUsers[this.transferPartnerAccountIndex].firstName + " " + this.tellawUsers[this.transferPartnerAccountIndex].lastName
          console.log(this.transferPartnerAccountName)
    }
    
  }
  request(){
    if(this.userPassword==this.passwordEntered){
       //Initialise date and time display settings
        var myDate = new Date;
        var allTime = myDate.toLocaleTimeString()
        var allDate =  myDate.toLocaleDateString()
      //Prepare Object details to send to Array
      this.requestDetails = {
        nameOfRequester:this.tellawUsers[this.userIndex].firstName + ' ' + this.tellawUsers[this.userIndex].lastName,
        date:allDate,
        time:allTime,
        description:this.transferDescription,
        indexOfRequestSender:this.userIndex,
        amount:parseFloat(this.fundAmount)
      }
      this.tellawUsers[this.transferPartnerAccountIndex].requests.push(this.requestDetails)

      //Send Details to History
       //Generate Reference number
      //  this.referenceNumber = Math.round(Math.random()*10000000000000000)
       //For Sender
      //  this.transferHistorySender = {
      //    nameOfReceiver: this.transferPartnerAccountName,
      //    accountNumberOfReceiver:this.tellawUsers[this.transferPartnerAccountIndex].accountNumber,
      //    date:allDate,
      //    time:allTime,
      //    description:`Transfer to ${this.transferPartnerAccountName}`,
      //    transferAmount:this.transferAmount,
      //    transactionType:'debit',
      //    referenceNumber:this.referenceNumber
      //  }
      //  this.tellawUsers[this.userIndex].history.push(this.transferHistorySender)

       //For Receiver
      //  this.transferHistoryReceiver = {
      //    nameOfSender: this.userArray.firstName + " " +this.userArray.lastName,
      //    accountNumberOfSender:this.userAccountNumber,
      //    date:allDate,
      //    time:allTime,
      //    description:`Transfer from  ${this.userArray.firstName}`,
      //    transferAmount:this.transferAmount,
      //    transactionType:'credit',
      //    referenceNumber:this.referenceNumber
      //  }
      //  this.tellawUsers[this.transferPartnerAccountIndex].history.push(this.transferHistoryReceiver)
       console.log(this.tellawUsers)

      localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
      alert(`Request Sent`)
      console.log(this.tellawUsers)
      
    }
    
    
  }
  
}
