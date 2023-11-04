import {Component, forwardRef, Input, OnChanges, OnInit, Optional, Self, SimpleChanges} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl,
  ValidationErrors,
  Validators
} from "@angular/forms";

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent implements ControlValueAccessor, Validators, OnChanges {

  @Input() icon: 'percent' | 'R$' = "R$";
  @Input() order: 'reverse' | 'row' = "row";
  @Input() size: 'normal' | 'lg' | 'sm' = 'normal';

  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (!!controlDir) controlDir.valueAccessor = this;
    this.rootValue.valueChanges.subscribe((val: string) => {

      // this.rootValue.patchValue(this.ajustNumber(val), { emitEvent: false })
      this.rootValue.patchValue(this.convertTypeNumber.toBr(this.ajustNumber(val)), { emitEvent: false })

      this.value = Number(this.ajustNumber(val));
      this.onChange(this.value);
      this.onTouched();
    })
  }

  ajustNumber(value: string | number): string {
    let val = String(value).replace(/\D/g, '')
    val = String(val).replace(/\./g, '')
    val = String(val).replace(',', '')

    if (!String(val).trim() || isNaN(Number(val))) {
      val = '0.00'
    }

    if (val.length < 3) {
      if (val.length == 1) val = '00' + val
      if (val.length == 2) val = '0' + val
    }

    console.log('toLocaleString', Number(val)
      .toLocaleString("en-us", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        }
      ))

    const int = Number(val.slice(0, val.length - 2))
    const decimal = val.slice(val.length - 2)

    return `${int}.${decimal}`;
  }

  convertTypeNumber = {
    toBrBKP: (val: string | number): string => {
      if (typeof val == 'string') {
        if (isNaN(Number(val))) {
          val = 0;
        }
      }

      return Number(val)
        .toLocaleString("BRL", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          }
        )
    },
    toBr: (val: string | number): string => {
      if (typeof val == 'string') {
        if (isNaN(Number(val))) {
          val = 0;
        }
      }

      return Number(val)
        .toLocaleString("BRL", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          }
        )
    },
    toEua: (val: string | number):number => {
      debugger
      if (typeof val == 'string') {
        // const newVal = val;
        val = val.replace('.', '').replace(',', '.')
        if (isNaN(Number(val))) {
          val = 0;
        }
      }

      return Number(val)
    },
  }

  /**======================================================
   *  METODOS DE RELAÇÃO COM NG_VALUE_ACCESSOR
   *
   *  Os metodos abaixo servem para relação entre o componente e o form (caso exista)
   =======================================================*/

  public rootValue = new FormControl('0.00')

    // valor de dados sincronizado com os FORMs
  public value: number = 0;

  public touched = false;

  // metodo repositório do "onChange()" fornecido pelo NG_VALUE_ACCESSOR
  onChange = (val: any) => {
  };
  // metodo repositório do "onTouched()" fornecido pelo NG_VALUE_ACCESSOR
  onTouched = () => {
  };

  // metodo de registro do "onChange()"
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  // metodo de registro do "onTouched()"
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  /*
   * metodo de acesso exclusívo do form.
   * esse metodo entrará em ação quando um valor for fornecido pelo form pai
   * e não por ações do próprio autocomplete
   *
   * @param value
   */
  writeValue(value: any) {
    this.value = value;
    // this.rootValue.patchValue(this.ajustNumber(value), { emitEvent: false });
    this.rootValue.patchValue(this.convertTypeNumber.toBr(value), { emitEvent: false });
  }

  // metodo para avisar ao form pai sobre o touche do autocomplete
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  // ação de alteração de estado do disabled
  setDisabledState(disabled: boolean) {
    this.rootValue[disabled ? 'disable' : 'enable']()
  }

  /**======================================================
   *  METODOS DE RELAÇÃO COM NG_VALIDATORS
   *
   *  Os metodos abaixo servem para relação entre o componente e o form (caso exista)
   =======================================================*/

  validateResult: any;

  validate(c: FormControl): ValidationErrors | null {
    const errors: { [key: string]: any } = c.errors || {};

    if (!!errors['required'] && !this.value) {
      this.validateResult = false
      return errors;
    }

    this.validateResult = true
    return null;
  }

  onValidationChange: any = () => {
  };

  registerOnValidatorChange(fn: () => void) {
    this.onValidationChange = fn;
  }


  static focusInput() {
    const input = window.document.getElementsByClassName('input-title')[0];

    if (!!input) {
      // @ts-ignore
      input?.focus()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange(this.value);
  }

}
