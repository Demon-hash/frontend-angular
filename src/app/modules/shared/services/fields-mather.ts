import { ErrorStateMatcher } from "@angular/material/core";
import { FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors } from "@angular/forms";

export class FieldsMatcher implements ErrorStateMatcher {
  constructor( private readonly first: string, private readonly second: string ) {

  }

  isErrorState( control: FormControl | null, form: FormGroupDirective | NgForm | null ): boolean {
    const isSubmitted = form && form.submitted;
    const equal = form?.control.get( this.first )?.value != null && form?.control.get( this.first )?.value === form?.control.get( this.second )?.value;
    return !!(control && (control.invalid || !equal) && (control.dirty || control.touched || isSubmitted));
  }
}
