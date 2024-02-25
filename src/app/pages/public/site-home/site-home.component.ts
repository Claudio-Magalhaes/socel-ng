import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GenericService} from "../../../services/generic-service/generic.service";
import {LOGIN} from "../../../_core/endpoints";

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

  constructor(private service: GenericService) { }

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
        // this.
      }
    })
  }

}
