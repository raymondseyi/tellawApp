import { AbstractType, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  public tellawUsers:any;
  public userIndex:any;
  public userArray:any;
  public fullName:any; 
  public userEmail:any;
  public getImages:any;
  public proPic:any;
  public profilePicture:any;
  public accountNumber:any
  public copyVar:any
  ngOnInit(): void {
    this.tellawUsers=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
    this.userIndex = localStorage.getItem("signedInIndex")
    this.userArray = this.tellawUsers[this.userIndex]
    this.fullName= `${this.tellawUsers[this.userIndex].firstName} ${this.tellawUsers[this.userIndex].lastName} `
    this.userEmail = this.tellawUsers[this.userIndex].email
    this.profilePicture = this.tellawUsers[this.userIndex].profilePicture
    this.proPic = this.tellawUsers[this.userIndex].profilePicture
    console.log(this.tellawUsers[this.userIndex])
    console.log( this.profilePicture)
    
    // this.profilePicture = localStorage.profilePicture?localStorage.profilePicture:""
    this.profilePicture = this.tellawUsers[this.userIndex].profilePicture
    this.accountNumber=this.tellawUsers[this.userIndex].accountNumber
    this.copyVar=""
    // this.getImage(imageInput:any)
  }
getImage(imageInput:any){
  const reader = new FileReader()
  
  reader.addEventListener("load",()=>{
    this.proPic = reader.result
    console.log(this.proPic)
    this.tellawUsers[this.userIndex].profilePicture = this.proPic
    localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
    // localStorage.setItem("profilePicture",this.proPic)
    // this.profilePicture = localStorage.profilePicture?localStorage.profilePicture:""
  })
  reader.readAsDataURL(imageInput.files[0])
  this.ngOnInit()
  
}
copied(){
  this.copyVar="copied!"
}
doneCopying(){
  this.ngOnInit()
  this.copyVar=""
}


}
