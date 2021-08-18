import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
public arr :any;
  constructor() { }

  // load(){
  //   return of (this.arr);
  // }
  // setArray(data:any){
  //     return this.arr.push(data);
  // }

}
