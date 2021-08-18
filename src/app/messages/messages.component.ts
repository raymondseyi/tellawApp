import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

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
  public requestsArray:any
  public requesterIndex:any
  public userHistory:any
  public messageForRequester:any
  public userMessages:any
  public reversedRequestsArray:any
  public reversedSlicedRequests:any
  ngOnInit(): void {
    this.tellawUsers=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.userFirstName = this.userArray.firstName
    this.userAccountNumber =this.userArray.accountNumber
    this.totalAmount=this.tellawUsers[this.userIndex].totalAmount
    this.userWallets=this.tellawUsers[this.userIndex].wallet
    this.mainAccountAmount=this.tellawUsers[this.userIndex].mainAccountAmount
    this.requestsArray= this.tellawUsers[this.userIndex].requests
    this.userHistory = this.tellawUsers[this.userIndex].history
    this.userMessages = this.tellawUsers[this.userIndex].messages
    this.reversedRequestsArray = this.requestsArray.reverse()
    this.reversedSlicedRequests = this.reversedRequestsArray.slice(0,3)
  }
  acceptRequest(i:any){
    //Check if the money in account is more than the requested Amount else alert Insufficient Funds
    if(this.mainAccountAmount >= this.tellawUsers[this.userIndex].requests[i].amount){
      //Initialise date and time display settings
    var myDate = new Date;
    var allTime = myDate.toLocaleTimeString()
    var allDate =  myDate.toLocaleDateString()
      //Send Money to the requester
      this.requesterIndex=this.tellawUsers[this.userIndex].requests[i].indexOfRequestSender
      this.tellawUsers[this.requesterIndex].mainAccountAmount+=this.tellawUsers[this.userIndex].requests[i].amount
      //Add it to requester total amount
      this.tellawUsers[this.requesterIndex].totalAmount += this.tellawUsers[this.userIndex].requests[i].amount
      console.log(this.tellawUsers[this.requesterIndex].totalAmount)
      // console.log(this.tellawUsers[this.requesterIndex].mainAccountAmount)
      // Remove Money From Requestee's Account
      this.tellawUsers[this.userIndex].mainAccountAmount -= this.tellawUsers[this.userIndex].requests[i].amount
      //Remove it from requester total amount
      this.tellawUsers[this.userIndex].totalAmount -= this.tellawUsers[this.userIndex].requests[i].amount
      //Delete Request from users request
      this.tellawUsers[this.userIndex].requests = this.tellawUsers[this.userIndex].requests.filter((val:any,ind:any)=>ind!=i)
      //Leave A message for the requester
    this.messageForRequester={
      date:allDate,
      time:allTime,
      message:`${this.userFirstName} accepted your request`
    }
    this.tellawUsers[this.requesterIndex].messages.push(this.messageForRequester)


    //Send Details to History
       //Generate Reference number
       this.referenceNumber = Math.round(Math.random()*10000000000000000)
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
      localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
      
      // console.log(this.tellawUsers)
      alert(`You have accepted ${this.tellawUsers[this.requesterIndex].firstName}'s request`)
     
      console.log(this.tellawUsers[this.userIndex].requests)
      this.ngOnInit()
    }
    else{
      alert(`Insufficient Funds`)
      console.log(this.tellawUsers)
    }
    
  }
  rejectRequest(i:any){
    this.requesterIndex=this.tellawUsers[this.userIndex].requests[i].indexOfRequestSender
    //Initialise date and time display settings
    var myDate = new Date;
    var allTime = myDate.toLocaleTimeString()
    var allDate =  myDate.toLocaleDateString()
    //Delete Request from users request
    this.tellawUsers[this.userIndex].requests = this.tellawUsers[this.userIndex].requests.filter((val:any,ind:any)=>ind!=i)
    //Leave A message for the requester
    this.messageForRequester={
      date:allDate,
      time:allTime,
      message:`${this.userFirstName} rejected your request`
    }
    this.tellawUsers[this.requesterIndex].messages.push(this.messageForRequester)
    alert(`You have rejected ${this.tellawUsers[this.requesterIndex].firstName}'s request`)
    localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
    console.log( this.tellawUsers)
    this.ngOnInit()
  }
}
