import { Component, OnInit, ViewChild } from "@angular/core";
import { UsersService, StoresService } from "@app/_services";
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
  @ViewChild(MatSort) sort: MatSort;
  states;
  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    public storeService: StoresService
  ) {}

  // users: any;
  ngOnInit() {
    this.loadAllUsers(1);
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
        let manufacturerId = 1;
        this.usersService.addUser(result, manufacturerId).subscribe(res => {
          this.loadAllUsers(1);
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
        let manufacturerId = 1;
        this.usersService.updateUser(result, manufacturerId).subscribe(res => {
          console.log(res);
          this.loadAllUsers(1);
        });
      }
    });
  }
  removeUser(username) {
    console.log(username);
    const manufacturerId = 1;
    this.usersService.deleteUser(manufacturerId, username).subscribe(res => {
      console.log(res);
      this.loadAllUsers(1);
    });
  }
}
