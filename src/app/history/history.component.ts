import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }
  public tellawUsers:Array<any>=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
  public userIndex:any;
  public userHistory:any
  public reversedHistory:any;
  public historyClicked:any;
  public transactionDescription:any;
  public transactionAmount:any
  public referenceNumber:any
  public time:any
  public date:any
  public transactionType:any
  public accountNumber:any
  public name:any
  ngOnInit(): void {
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userHistory = this.tellawUsers[this.userIndex].history
    this.reversedHistory = this.userHistory.reverse()
    console.log(this.tellawUsers[this.userIndex].history[3].transactionType);
    
  }
  viewMore(i:any){
    this.historyClicked=this.tellawUsers[this.userIndex].history[i]
    console.log(i)
    this.transactionDescription = this.tellawUsers[this.userIndex].history[i].description
    this.transactionAmount = this.tellawUsers[this.userIndex].history[i].transferAmount
    this.referenceNumber = this.tellawUsers[this.userIndex].history[i].referenceNumber;
    this.date = this.tellawUsers[this.userIndex].history[i].date
    this.time= this.tellawUsers[this.userIndex].history[i].time
    this.transactionType = this.tellawUsers[this.userIndex].history[i].transactionType;
    this.accountNumber = this.tellawUsers[this.userIndex].history[i].accountNumber
    this.name = this.tellawUsers[this.userIndex].history[i].name


    console.log(this.transactionDescription);
    
  }

}
