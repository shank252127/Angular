import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'customPipe';
  data : number = 0;
  callme(val :any){
    console.log(val.target.value)
    this.data = val.target.value
  }
}
