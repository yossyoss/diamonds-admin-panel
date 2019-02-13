import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { TableModule } from "primeng/table";
import { User } from "@app/_models";
import { UserService, AuthenticationService } from "@app/_services";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [
    {
        "name": "Tal",
        "email": "tlusa18@gmail.com",
        "phone": "+1983746543",
        "barcode": "11111",
        "videoUrl": "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
        "sales_person": {
            "id": 10,
            "firstName": "uri",
            "lastName": "the tall",
            "username": "uri@gnail.com",
            "password": "12345",
            "role": "SALES",
            "store": "Concord Mills"
        }
    },
    {
        "name": "Moshe Zar",
        "email": "mosh@gmail.com",
        "phone": "+1983746543",
        "barcode": "11111",
        "videoUrl": "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
        "sales_person": {
            "id": 12,
            "firstName": "Nadia",
            "lastName": "Ben Zaken",
            "username": "nadia@gmail.com",
            "password": "11111",
            "role": "SALES",
            "store": "Tucson Premium Outlets"
        }
    },
    {
        "name": "yariv",
        "email": "yariv@gmail.com",
        "phone": "+1983746543",
        "barcode": "11111",
        "videoUrl": "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
        "sales_person": {
            "id": 12,
            "firstName": "Nadia",
            "lastName": "Ben Zaken",
            "username": "nadia@gmail.com",
            "password": "11111",
            "role": "SALES",
            "store": "Tucson Premium Outlets"
        }
    },
    {
        "name": "Dana International",
        "email": "dana.int@gmail.com",
        "phone": "+1983746543",
        "barcode": "54321",
        "videoUrl": "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/54321.mp4",
        "sales_person": {
            "id": 11,
            "firstName": "Yosi",
            "lastName": "the dos",
            "username": "yosi@gmail.com",
            "password": "123123",
            "role": "SALES",
            "store": "Concord Mills"
        }
    },
    {
        "name": "Moshik Rot",
        "email": "mo.shik@gmail.com",
        "phone": "+1983746543",
        "barcode": "54321",
        "videoUrl": "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/54321.mp4",
        "sales_person": {
            "id": 12,
            "firstName": "Nadia",
            "lastName": "Ben Zaken",
            "username": "nadia@gmail.com",
            "password": "11111",
            "role": "SALES",
            "store": "Tucson Premium Outlets"
        }
    },
    {
        "name": "Shmulik Kippod",
        "email": "shmullik@gmail.com",
        "phone": "+1983746543",
        "barcode": "11111",
        "videoUrl": "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
        "sales_person": {
            "id": 12,
            "firstName": "Nadia",
            "lastName": "Ben Zaken",
            "username": "nadia@gmail.com",
            "password": "11111",
            "role": "SALES",
            "store": "Tucson Premium Outlets"
        }
    }
];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers();
      });
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }
}
