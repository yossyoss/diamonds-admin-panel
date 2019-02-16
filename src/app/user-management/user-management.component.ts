import { Component, OnInit } from "@angular/core";
import { UsersService } from "@app/_services";

@Component({
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"]
})
export class UserManagementComponent implements OnInit {
  constructor(private usersService: UsersService) {}
  users: any;
  ngOnInit() {
    this.usersService.getAll().subscribe(users => {
      this.users = users;
    });
  }
}
