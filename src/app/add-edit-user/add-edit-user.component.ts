import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import {
  UsersService,
  StoresService,
  AuthenticationService
} from "@app/_services";
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
  states: any;
  stores: any;
  inValid: string;
  manufacturerId: string;
  constructor(
    private dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    public storesService: StoresService
  ) {
    this.editForm = this.formBuilder.group({
      firstName: [],
      lastName: [],
      username: [],
      role: [],
      password: [],
      state: [],
      store: []
    });
  }
  onChange(_event: any, state: any) {
    if (_event.isUserInput) {
      this.storesService
        .getStoresByState(this.manufacturerId, state.abbr)
        .subscribe(stores => {
          this.stores = stores;
          this.editForm.patchValue({ store: stores });
        });
    }
  }

  ngOnInit() {
    this.manufacturerId = this.authenticationService.currentUserValue.manufacturerId;
    this.storesService.getAllStates().subscribe(res => {
      this.states = res;
      if (this.data.user) {
        //editin user
        this.user = this.data.user;
        const stroeName = this.user.store ? this.user.store.name : "";
        this.storesService
          .getStoresByState(this.manufacturerId, this.user.store.state)
          .subscribe(stores => {
            this.editForm = this.formBuilder.group({
              firstName: [this.user.firstName, Validators.required],
              lastName: [this.user.lastName, Validators.required],
              username: [this.user.username, [Validators.required]],
              role: [this.user.role, [Validators.required]],
              password: [
                this.user.password,
                [Validators.required, Validators.minLength(4)]
              ],
              state: [this.states, [Validators.required]],
              store: [stores, [Validators.required]]
            });

            setTimeout(() => {
              this.editForm.controls["store"].setValue(this.user.store.name, {
                onlySelf: true
              });
            }, 300);
            this.editForm.controls["state"].setValue(this.user.store.state, {
              onlySelf: true
            });
          });
        // const manufactureId = 1;
        // this.storesService
        //   .getStoresByState(manufactureId, this.user.store.state)
        //   .subscribe(stores => {
        //     this.stores = stores;
        //     this.editForm.patchValue({ store: stores });
        //     this.editForm.controls["store"].setValue("test", {
        //       onlySelf: true
        //     });
        //   });
      } else {
        //adding user
        this.editForm = this.formBuilder.group({
          firstName: ["", Validators.required],
          lastName: ["", Validators.required],
          username: ["", [Validators.required]],
          role: ["", [Validators.required]],
          password: ["", [Validators.required]],
          state: ["", [Validators.required]],
          store: ["", [Validators.required]]
        });
      }
    });
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
      return;
    }

    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.editForm.value));
    this.dialogRef.close(this.editForm.value);
  }
  onNoClick(): void {
    console.log("form is close");
  }
}
