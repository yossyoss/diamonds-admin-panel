import { Component, OnInit, ViewChild } from "@angular/core";
import { UsersService } from "@app/_services";
import { MatSort, MatTableDataSource } from "@angular/material";
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
  dataSource: any; // = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService) {}

  // users: any;
  ngOnInit() {
    this.loadAllUsers(1);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private loadAllUsers(manufacturerId) {
    this.usersService
      .getAllUsersByManufacturer(manufacturerId)
      .subscribe(users => {
        this.dataSource = users;
      });
  }
  editUser(userId) {
    console.log(userId);
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
