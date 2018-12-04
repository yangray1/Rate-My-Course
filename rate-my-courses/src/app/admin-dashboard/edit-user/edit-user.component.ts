import { Component, Inject } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { UsersService, User } from 'src/app/_services/users.service';
import { MatDialogRef, MatChipInputEvent, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

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
    console.log(this.user);
    this.userService.saveUser(this.user).subscribe(savedUser => {
      console.log(savedUser);
      this.dialogRef.close(true);
    });
  }

}
