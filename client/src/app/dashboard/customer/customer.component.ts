import { User } from './../../common/model/user-model';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  user!: User[];
  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.getAll().subscribe((res: any) => {
      const value = res.allUsers;
      this.user = value;
    });
  }
}
