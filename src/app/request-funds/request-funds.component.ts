import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-funds',
  templateUrl: './request-funds.component.html',
  styleUrls: ['./request-funds.component.css']
})
export class RequestFundsComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  cancelRequest(){
    this.router.navigate(['/dashboard'])
  }
}
