import {ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'dg-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  config = {
    open: false,
    animate: false, // controla quano animação já foi executada ou não. evita erros de animação
    htmlHeader: false,
    htmlFooter: false,
    zIndex: 800,
    bloqueiaClose: false
  }

  static listaModalAtivo = 800;

  @Input('size') size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'custom-modal-size' = 'lg';
  @Input('alignV') alignV?: 'top' | 'bottom' | 'center' = 'center';
  @Input('alignH') alignH?: 'left' | 'right' | 'center' = 'center';
  @Input('title') title?: string = "titulo padrão";
  @Input('titleSpan') titleSpan?: string;
  @Input('bgClose') bgClose?: boolean = false;
  @Input('escClose') escClose?: boolean = true;
  @Input('afterClose') afterClose?: Function | null = null;
  @Input('beforeClose') beforeClose?: Function | null = null;

  @Input('data') data: any;

  @HostListener('document:keydown.esc', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.escClose) {
      this.close();
    }
  }

  constructor(private cdRef: ChangeDetectorRef) { }

  @ViewChild('htmlHeader') htmlHeader: any;
  @ViewChild('htmlFooter') htmlFooter: any;
  @ViewChild('carModal') carModal: any;

  ngAfterViewInit() {
    this.config.htmlHeader = this.htmlHeader.nativeElement && this.htmlHeader.nativeElement.children.length > 0;
    this.config.htmlFooter = this.htmlFooter.nativeElement && this.htmlFooter.nativeElement.children.length > 0;
    this.cdRef.detectChanges();
  }

  public open(configs?: {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full',
    title?: string,
    alignV?: 'top' | 'bottom' | 'center',
    alignH?: 'left' | 'right' | 'center',
    bgClose?: boolean,
    escClose?: boolean
  }): void {
    if (this.config.open) return;
    if (configs) {
      if (configs.size) {
        this.size = configs.size;
      }
      if (configs.title) {
        this.config.htmlHeader = false;
        this.title = configs.title;
      }
      if (configs.alignV) {
        this.alignV = configs.alignV;
      }
      if (configs.alignH) {
        this.alignH = configs.alignH;
      }
      if (configs.bgClose) {
        this.bgClose = configs.bgClose;
      }
      if (configs.escClose) {
        this.escClose = configs.escClose;
      }
    }

    this.config.zIndex = ModalComponent.addOpen();

    this.config.open = true;
  }

  public close() {
    if (!this.config.bloqueiaClose) {
      if (typeof this.beforeClose === "function") {
        if (this.beforeClose()) {
          ModalComponent.addClose();
          this.config.open = false;

          if (typeof this.afterClose === "function") {
            this.afterClose()
          }
        }
      } else {
        ModalComponent.addClose();
        this.config.open = false;

        if (typeof this.afterClose === "function") {
          this.afterClose()
        }
      }
    }
  }

  public closeAll(){
    ModalComponent.realCloseAll();
  }

  protected static realCloseAll() {

  }

  public bloqueiaClose(){
    this.config.bloqueiaClose = true;
  }

  public liberaClose(){
    this.config.bloqueiaClose = false;
  }

  ngOnInit(): void {
  }

  private static addOpen(){
    ModalComponent.listaModalAtivo = ModalComponent.listaModalAtivo + 1;
    return ModalComponent.listaModalAtivo;
  }

  private static addClose(){
    ModalComponent.listaModalAtivo = ModalComponent.listaModalAtivo - 1;
    return ModalComponent.listaModalAtivo;
  }

  bgClick(event?: any) {
    if (!this.carModal.nativeElement.contains(event.target) && this.bgClose) {
      this.close();
    }
  }

  executarFuncao(func: Function | null | undefined, event: string): void {
    if (typeof func === 'function') {
      func();
    }
    if (event) {
      window.dispatchEvent(new CustomEvent(event));
    }
  }
}
