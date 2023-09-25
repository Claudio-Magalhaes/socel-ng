import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(public http: HttpClient) {}

  public getCep(cep: string, action: Function): void {
    if ((cep || '').length < 8) return;
    this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
      (resp: any) => {
        if (!resp?.erro) {
          action(resp)
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'CEP inválido',
            timer: 3000,
            confirmButtonText: 'Sair'
          }).then()
        }
      }
    )
  }
}
