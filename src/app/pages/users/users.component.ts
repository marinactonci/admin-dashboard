import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { passwordValidator } from './password-validator';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEdit: boolean = false;
  currentUserId: string = '';

  multiSelectOptions = [
    { label: 'Administrator', value: 'Administrator' },
    { label: 'Customer', value: 'Customer' },
  ];

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator()],
      ],
      roles: [[]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  submitForm(): void {
    if (this.userForm.valid) {
      const user: User = {
        ...this.userForm.value,
        createdOn: new Date(),
      };

      if (this.isEdit && this.currentUserId !== null) {
        this.userService.updateUser(this.currentUserId, user).subscribe(() => {
          this.loadUsers();
          this.resetForm();
        });
      } else {
        this.userService.createUser(user).subscribe(() => {
          this.loadUsers();
          this.resetForm();
        });
      }
    }
  }

  editUser(user: User): void {
    this.isEdit = true;
    this.currentUserId = user.id!;
    this.userForm.patchValue(user);
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  resetForm(): void {
    this.isEdit = false;
    this.currentUserId = '';
    this.userForm.reset();
  }
}
