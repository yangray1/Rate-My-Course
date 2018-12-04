import { Component, OnInit, Inject } from '@angular/core';
import { User, UsersService } from 'src/app/_services/users.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { EditUserComponent } from 'src/app/admin-dashboard/edit-user/edit-user.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  user: User;
  origUsername: string;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(
    private userService: UsersService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.user = data;
    this.origUsername = this.user.username;
  }

  ngOnInit() {
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.user.programOfStudy.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(program: any) {
    const index = this.user.programOfStudy.indexOf(program);

    if (index >= 0) {
      this.user.programOfStudy.splice(index, 1);
    }
  }

  save() {
    this.userService.saveUser(this.user).subscribe(savedUser => {
      console.log(savedUser);
      this.dialogRef.close();
    });
  }
}
