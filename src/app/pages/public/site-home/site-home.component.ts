import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GenericService} from "../../../services/generic-service/generic.service";
import {LOGIN} from "../../../_core/endpoints";
import {TokenService} from "../../../services/token-service/token.service";
import {SessionService} from "../../../services/session-service/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-home',
  templateUrl: './site-home.component.html',
  styleUrls: ['./site-home.component.scss']
})
export class SiteHomeComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  // viewPass: boolean = false;

  constructor(
    private service: GenericService,
    private token: TokenService,
    private session: SessionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = this.form.value;

    this.service.post(LOGIN, form).subscribe(resp => {
      if(resp.status) {
        this.token.saveToken(resp.data.access_token);
        this.session.setUser();
        this.router.navigate(['/user']).then()
      }
    })
  }

}
