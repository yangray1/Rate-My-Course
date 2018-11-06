import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard2',
  templateUrl: './user-dashboard2.component.html',
  styleUrls: ['./user-dashboard2.component.scss'],
})
export class UserDashboard2Component {
  name = "Raymond Yang"
  cards: any;
  
  changeInfoForm = this.fb.group({
    displayName: [null, Validators.required],
    oldPassword: [null, Validators.required],
    newPassword: [null, Validators.required],
  });

  constructor(private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute) { 
      this.setCards();
    }

  onSave(){
    if (this.changeInfoForm.invalid){
      alert("Invalid fields. Please fill in all the required fields.");
      return;
    }
    alert("Information suceesfully changed!")
    this.router.navigate(
      ['/user-dashboard2'],
      { relativeTo: this.activeRoute }
    );
  }
  
  setCards() {
  /** Based on the screen size, switch from standard to one column per row */
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: 'Change Information', cols: 1, rows: 1 }
  
          ];
        }
  
        return [
          { title: 'Change Information', cols: 1, rows: 1 }
  
        ];
      })
    );
  }
}
