import { Component, OnInit, ViewChild } from "@angular/core";
import { UsersService } from "@app/_services";
import { MatSort, MatTableDataSource } from "@angular/material";
@Component({
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"]
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ["firstName", "lastName", "username","role","store"];
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

  private loadAllUsers(id) {
    this.usersService.getAll(id).subscribe(users => {
      this.dataSource = [
        {
          id: 10,
          firstName: "uri",
          lastName: "the tall",
          username: "uri@gnail.com",
          password: "12345",
          role: "SALES",
          store: {
            id: 10,
            state: "North Carolina",
            city: "Concord",
            name: "Concord Mills",
            manufacturer: { id: 1, name: "tiffany's" }
          },
          manufacturer: { id: 1, name: "tiffany's" }
        },
        {
          id: 11,
          firstName: "Yosi",
          lastName: "the dos",
          username: "yosi@gmail.com",
          password: "123123",
          role: "SALES",
          store: {
            id: 10,
            state: "North Carolina",
            city: "Concord",
            name: "Concord Mills",
            manufacturer: { id: 1, name: "tiffany's" }
          },
          manufacturer: { id: 1, name: "tiffany's" }
        },
        {
          id: 12,
          firstName: "Nadia",
          lastName: "Ben Zaken",
          username: "nadia@gmail.com",
          password: "11111",
          role: "SALES",
          store: {
            id: 12,
            state: "Arizona",
            city: "Tucson",
            name: "Tucson Premium Outlets",
            manufacturer: { id: 1, name: "tiffany's" }
          },
          manufacturer: { id: 1, name: "tiffany's" }
        },
        {
          id: 13,
          firstName: "uri",
          lastName: "zeituni",
          username: "zeituni@gmail.com",
          password: "12345",
          role: "ADMIN",
          store: {
            id: 10,
            state: "North Carolina",
            city: "Concord",
            name: "Concord Mills",
            manufacturer: { id: 1, name: "tiffany's" }
          },
          manufacturer: { id: 1, name: "tiffany's" }
        },
        {
          id: 14,
          firstName: "firstName",
          lastName: "lastName",
          username: "yoss",
          password:
            "$2a$10$yT1AWbd1AVcDXh0.at1Sxu1G7P0E7Bhu3EWLXJhuwTodWVXX6ReNq",
          role: "ADMIN",
          store: {
            id: 10,
            state: "North Carolina",
            city: "Concord",
            name: "Concord Mills",
            manufacturer: { id: 1, name: "tiffany's" }
          },
          manufacturer: { id: 1, name: "tiffany's" }
        },
        {
          id: 15,
          firstName: "string",
          lastName: "string",
          username: "string",
          password:
            "$2a$10$II/4tp1rB8VKSKyWeRq7leBTSMBf0e/k.VEIAcWowYUlyuQyRqmUu",
          role: "string",
          store: {
            id: 10,
            state: "North Carolina",
            city: "Concord",
            name: "Concord Mills",
            manufacturer: { id: 1, name: "tiffany's" }
          },
          manufacturer: { id: 1, name: "tiffany's" }
        }
      ];
    });
  }
}
