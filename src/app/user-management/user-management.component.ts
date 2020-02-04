import { Component, OnInit, ViewChild } from "@angular/core";
import {
  UsersService,
  StoresService,
  AuthenticationService
} from "@app/_services";
import {
  MatSort,
  MatTableDataSource,
  MatDialog,
  MAT_DIALOG_DATA
} from "@angular/material";
import { AddEditUserComponent } from "../add-edit-user/add-edit-user.component";
@Component({
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"]
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "username",
    "role",
    "store",
    "action"
  ];
  dataSource: any = new MatTableDataSource(); // = new MatTableDataSource(ELEMENT_DATA);
  manufacturerId: string;
  @ViewChild(MatSort) sort: MatSort;
  states;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public storeService: StoresService
  ) {}

  // users: any;
  ngOnInit() {
    this.manufacturerId = this.authenticationService.currentUserValue.manufacturerId;
    this.loadAllUsers(this.manufacturerId);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog() {
    let dialogRef = this.dialog.open(AddEditUserComponent, {
      width: "600px",
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      if (result) {
        this.usersService
          .addUser(result, this.manufacturerId)
          .subscribe(res => {
            this.loadAllUsers(this.manufacturerId);
          });
      }
    });
  }
  private loadAllUsers(manufacturerId) {
    this.usersService
      .getAllUsersByManufacturer(manufacturerId)
      .subscribe(users => {
        this.dataSource.data = users;
        this.dataSource.sort = this.sort;
      });
  }
  editUser(user) {
    console.log(user);
    let dialogRef = this.dialog.open(AddEditUserComponent, {
      width: "600px",
      data: {
        user
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      if (result) {
        this.usersService
          .updateUser(result, this.manufacturerId)
          .subscribe(res => {
            console.log(res);
            this.loadAllUsers(this.manufacturerId);
          });
      }
    });
  }
  removeUser(username) {
    console.log(username);
    this.usersService
      .deleteUser(this.manufacturerId, username)
      .subscribe(res => {
        console.log(res);
        this.loadAllUsers(this.manufacturerId);
      });
  }
}
