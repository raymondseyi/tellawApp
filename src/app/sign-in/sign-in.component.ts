import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public fb:FormBuilder,public router:Router) { }
  public userForm:FormGroup = this.fb.group({})
  public signInTester:any;
  public userIndex:any;
  public tellawUsers:Array<any>=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
  ngOnInit(): void {
    this.userForm = this.fb.group({
      email:[""],
      password:[""]
    })
  }
  signIn(){
    this.signInTester=this.tellawUsers.find((val:any,i:any)=>this.tellawUsers[i].email==this.userForm.value.email && this.tellawUsers[i].password==this.userForm.value.password)
    console.log(this.signInTester)
    if(!this.signInTester){
      alert(`Details not found, Kindly Enter Correct Details`)
    }
    else{
      this.userIndex=this.tellawUsers.indexOf(this.signInTester)
      console.log(this.userIndex)
      localStorage.setItem("signedInIndex",this.userIndex)
      alert(`Welcome, ${this.signInTester.firstName}`);
      this.router.navigate(["/dashboard"])
    }
  }
}
