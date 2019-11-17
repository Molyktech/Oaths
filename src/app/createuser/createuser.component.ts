import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LoginValidators } from './../validators/login.validators';
import { RolesService } from '../services/roles.service';
import { Role } from '../models/role';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {

  roles: Role[];
  createUserForm;
  users:User[];
  loading=true;
  loading2=false;
  constructor(
    private modalService: NgbModal,
    private roleService: RolesService,
    private loginService: LoginService
  ) { }

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'phoneNo', 'role'];

  ngOnInit() {
    this.createUserForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      phoneNo: new FormControl(''),
      role: new FormControl(),
      roleID: new FormControl(),
      id: new FormControl(0),
      email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [
        Validators.required,
        LoginValidators.shouldNotHaveSpaces
      ])
    });
    this.getRoles();
    this.getUsersByInstittutionId();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  get firstName() {
    return this.createUserForm.get('firstName');
  }

  get lastName() {
    return this.createUserForm.get('lastName');
  }

  get userName() {
    return this.createUserForm.get('userName');
  }

  get phoneNo() {
    return this.createUserForm.get('phoneNo');
  }

  get password() {
    return this.createUserForm.get('Password');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  getRoles() {
    this.roleService.getRoleByInstitutionId(1).subscribe(data => {
      this.roles = data as Role[];
    },
      err => {
      });
  }

  createUser() {
    this.loading2=true
    this.createUserForm.value.institutionID = 1;
    this.createUserForm.value.roleID=this.roles.find(x=> {return x.name==this.createUserForm.value.role}).id
    delete this.createUserForm.value.role
    //console.log(this.createUserForm.value);
    this.loginService.createUser(this.createUserForm.value).subscribe(data => {
      this.loading2=false
      this.getUsersByInstittutionId()
      this.modalService.dismissAll('')
    },
      err => {
    });
  }

  getUsersByInstittutionId(){
    this.loginService.getUsers(1).subscribe(data=>{
      console.log("users",data)
      this.users=<User[]>data
      this.loading=false
    },
      err=>{
    })
  }

}
