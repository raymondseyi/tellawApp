import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public fb:FormBuilder, public router:Router) { }
  
  public userForm:FormGroup= this.fb.group({})
  public tellawUsers:Array<any>=localStorage.localTellawUsers?JSON.parse(localStorage.localTellawUsers):[]
  public accountNumber:any ="1211" +(Math.round(Math.random()*1000000))
  public proPic:any;
  public profilePicture:any;
  
  ngOnInit(): void {
   this.userForm = this.fb.group({
     firstName: ["",Validators.required],
     lastName: ["",Validators.required],
     phoneNumber: ["",Validators.required],
     email: ["",Validators.required],
     password: ["",Validators.required],
     accountNumber: [this.accountNumber],
     mainAccountAmount:[0],
     totalAmount:[0],
     history:[[]],
     wallet:[[]],
     requests:[[]],
     messages:[[]],
     beneficiaries:[[]],
     profilePicture:[""]
   })
   
  }
  signUp(){
    if(this.userForm.valid){
      this.tellawUsers.push(this.userForm.value)
      localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
      console.log(this.tellawUsers)
      alert(`You have signed up successfully, Kindly Sign In`)
      this.router.navigate(["/sign-in"])
      console.log(this.userForm.value)
    }
    else{
      alert(`Kindly fill in all details`)
    } 
    
  }
  // getImage(imageInput:any){
  //   const reader = new FileReader()
    
  //   reader.addEventListener("load",()=>{
  //     this.proPic = reader.result
  //     // console.log(this.proPic)
  //     // localStorage.setItem("profilePicture",this.proPic)
  //     // this.profilePicture = localStorage.profilePicture?localStorage.profilePicture:""
  //   })
  //   reader.readAsDataURL(imageInput.files[0])
  //   this.profilePicture = this.proPic
  //   // console.log(this.proPic)
  // }
  
}
