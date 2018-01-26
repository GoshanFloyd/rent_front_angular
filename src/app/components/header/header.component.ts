import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

declare const $: any;
declare const UIkit: any;

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  @Output() onLogin = new EventEmitter<boolean>()

  public formRegisterUser = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    nickname: new FormControl(),
    phone: new FormControl()
  })

  private token: string;
  public userinfo: string;
  public backendHost: string = 'http://beru.rent/';

  public loginState: boolean = false;
  public products: Array<any> = [];

  public formLoginUser = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private _userService: UserService) {

  }

  ngOnInit() {
    this.getToken()
  }

  public getUserInfo(){

    this._userService.getUserInfo(this.token).subscribe(
      data => {
        this.loginState = true;
        this.userinfo = data.json();
        this.onLogin.emit(this.loginState);
      },
      err => console.log(err)
    )
  }

  public getToken() {

    this.token = localStorage.getItem('auth_token_rent');

    this.getUserInfo();
  }


  public registerUser(event: Event){
    const user = {
      username: this.formRegisterUser.get('username').value,
      password: this.formRegisterUser.get('password').value,
      phone: this.formRegisterUser.get('phone').value,
      nickname: this.formRegisterUser.get('nickname').value
    }

    this._userService.registerUser(user).subscribe(
      data => {
        if (data.json().user){
          this._userService.authUser({
            username:data.json().user.username,
            password:data.json().user.password
          }).subscribe(
            data => {
              if(data.json().token){
                const modal = UIkit.modal('#sign-up-modal');
                modal.hide();
                localStorage.setItem('auth_token_rent', data.json().token);
                this.getToken();
              }

            },
            err => console.log(err)
          )
        }
      },
      err => console.log(err)
    )
  }


  public authUser(){
    let data = {
      username: this.formLoginUser.get('username').value,
      password: this.formLoginUser.get('password').value
    }

    this._userService.authUser(data).subscribe(
      data => {
        if(data.json().token){
          localStorage.setItem('auth_token_rent', data.json().token)
          this.token = data.json().token;
          this.loginState = true;
          this.onLogin.emit(this.loginState);

          const modal = UIkit.modal('#login-modal');
          modal.hide();
        }
      },
      err => console.log(err)
    )
  }

  public logOut(event: Event){
    event.preventDefault();

    this.loginState = false;
    localStorage.removeItem('auth_token_rent');

    this.onLogin.emit(this.loginState);
  }

}
