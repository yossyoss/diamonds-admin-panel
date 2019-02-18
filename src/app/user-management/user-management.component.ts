import { Component, OnInit } from "@angular/core";
import { UsersService } from "@app/_services";
import { MatSort, MatTableDataSource } from "@angular/material";
@Component({
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"]
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "email",
    "phone",
  ];
  dataSource: any;// = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService) {}
  
  users: any;
  ngOnInit() {
    this.usersService.getAll().subscribe(users => {
      this.users = users;
    });
  }
  ngOnInit() {
    this.loadAllCustomers();
    this.dataSource.sort = this.sort;
    // this.dataSource = this.users;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  private loadAllCustomers() {
    this.usersService.getAll().subscribe(users => {
      this.dataSource = users;
    });
  }
  
}
