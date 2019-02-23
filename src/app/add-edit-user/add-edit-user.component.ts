import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { UsersService } from "@app/_services";
import { MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-add-edit-user",
  templateUrl: "./add-edit-user.component.html",
  styleUrls: ["./add-edit-user.component.css"]
})
export class AddEditUserComponent implements OnInit {
  user: any;
  editForm: FormGroup;
  submitted = false;
  constructor(
    private dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.user) {
      this.user = this.data.user;
      this.editForm = this.formBuilder.group(
        {
          firstName: [this.user.firstName, Validators.required],
          lastName: [this.user.lastName, Validators.required],
          username: [this.user.username, [Validators.required]],
          role: [this.user.role, [Validators.required]],
          password: [this.user.password, [Validators.required]]
          // store: [this.user.store.name, [Validators.required]]
        }
        // {
        //     validator: MustMatch('password', 'confirmPassword')
        // }
      );
      // this.usersService.
    } else {
      this.editForm = this.formBuilder.group(
        {
          firstName: ["", Validators.required],
          lastName: ["", Validators.required],
          username: ["", [Validators.required]],
          role: ["", [Validators.required]],
          password: ["", [Validators.required]]
          // store: ['', [Validators.required]]
        }
        // {
        //     validator: MustMatch('password', 'confirmPassword')
        // }
      );
    }
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      console.log("form is invalid");
      this.dialogRef.disableClose = true;
      return;
    }

    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.editForm.value));
    this.dialogRef.close(this.editForm.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
