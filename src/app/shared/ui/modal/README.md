#Dg-modal

Component modal padronizado no modelo da DG.

Esse modulo pretende padronizar as apresentações de modal em todas as principais partes do sistema.

Tamanho máximo do height de 90% da tela exceto em casos full.

## Abertura por HTML

use essa estrutura para gerar um modal sem usar o TS, e o modal
criará o button de fechar automaticamente
````html
<dg-button ... (click)="modal.open()">open</dg-button>
<dg-modal #modal title="titulo do modal">
  <div dg-content>
    seu conteudo aqui...
  </div>
</dg-modal>
````

## Avertura por TS
````html
<dg-modal #modal title="titulo do modal">
  <div dg-content>
    seu conteudo aqui...
  </div>
</dg-modal>
````

````ts
import {ViewChild} from "@angular/core";
import {ModalCustomButton} from "./ModalCustomButton";
import {DgModalComponent} from "./dg-modal.component";

@ViewChild('modal') modal: DgModalComponent;

open() {
    this.modal.open();
}
close() {
    this.modal.open();
}
````
<hr>

##Inputs

Todos os dados necessários para a execução podem ser atribuídos diretamente no HTML.
Porém, todos eles também podem ser substituídos no metodo open(). 

###Input HTML
````html
<dg-modal
  #modal
  title="titulo do modal"
  titleSpan="informação adicional"
  size="lg"
  alignH="center"
  alignV="center"
  [bgClose]="false"
  [escClose]="true"
>
  <div dg-content>
    seu conteudo aqui...
  </div>
</dg-modal>
````
Todos os dados informados no exemplo acima representam as opções default do componente

###Input TS
Leve também como apresentação dos metodos <b>OPEN()</b> e <b>CLOSE()</b>.
````ts
import {ViewChild} from "@angular/core";
import {ModalCustomButton} from "./ModalCustomButton";
import {DgModalComponent} from "./dg-modal.component";

@ViewChild('modal') modal: DgModalComponent;

open() {
    this.modal.open({
      title: "titulo do modal",
      titleSpan: "informação adicional",
      size: "lg",
      alignH: "center",
      alignV: "center",
      bgClose: "false",
      escClose: "true"
    });
}
close() {
    this.modal.open();
}
````
####title: string | Dafault = VAZIO
Titulo do modal
<hr>

####titleSpan: string | Dafault = VAZIO
texto com informação extra a direita alinhado com o titulo
<hr>

####size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
tamanho do modal na horizontal. <br>
A vertical terá ajuste automático

* SM - 25% da tela
* MD - 50% da tela
* LG - 75% da tela
* XL - 90% da tela
* FULL 100% da tela EM TODAS AS DIREÇÕES
<hr>

####alignH: 'left' | 'right' | 'center' | Default = CENTER
Alinhaento horizontal
<hr>

####alignV: 'top' | 'bottom' | 'center' | Default = CENTER
Alinhaento vertical
<hr>

####bgClose: boolean | Default = FALSE
Permite fechar ao clicar fora do modal
<hr>

####escClose: boolean | Default = TRUE
Permite fechar ao precionar ESC do teclado
<hr>

##Metodos adicionais do componente

###
