import {AbstractEntity} from "@datagrupo/dg-crud";


export class ContatoEntity extends AbstractEntity {

  constructor(
    id?: number | string,
    telefone?: string,
    email?: string
  ) {
    super();
    this.id = id;
    this.telefone = telefone;
    this.email = email;
  }

  public telefone: string | undefined
  public email: string | undefined

}
