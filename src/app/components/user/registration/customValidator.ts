import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { diversa: true }
        : null;
    };
  }
}
// questo è un validatore personalizzato che confronta due campi di un form e restituisce un errore se i valori
//  non corrispondono. Viene utilizzato per verificare che la password e la conferma della password siano uguali.
