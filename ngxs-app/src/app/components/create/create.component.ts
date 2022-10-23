import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {AddUser} from "../../store/user.action";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  userForm!: FormGroup;


  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
  }

  public createUser() {
    this.userForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ]
    })
  }

  public addUser(name: string, email: string) {
    this.store.dispatch(new AddUser({name, email}))
  }
}
