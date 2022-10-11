import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { map, Observable, startWith } from "rxjs";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Component( {
  selector: 'app-new-group-dialog',
  templateUrl: './new-group-dialog.component.html',
  styleUrls: [ './new-group-dialog.component.scss' ]
} )
export class NewGroupDialogComponent implements OnInit {

  url: string = '';
  title: string = '';

  myControl = new FormControl<string | { name: string }>( '' );
  options: { name: string }[] = [
    { name: 'Anime' },
    { name: 'Games' },
    { name: 'Programming' },
    { name: 'Humor' },
    { name: 'Food' },
    { name: 'Technique' },
    { name: 'NSFW' },
  ];
  filteredOptions: Observable<{ name: string }[]> | undefined;

  readonly form = this.formBuilder.group( {
    logo: [ '', [ Validators.required ] ],
    title: [ '', [ Validators.required ] ],
    subject: [ '', [ Validators.required ] ],
    desc: [ '' ],
    private: [ false ],
  } );


  onChange( event: any ) {
    const reader = new FileReader();

    reader.onload = ( event: any ) => {
      this.url = event.target.result;
    };

    reader.onerror = ( event: any ) => {
      console.log( "File could not be read: " + event.target.error.code );
    };

    reader.readAsDataURL( event.target.files[ 0 ] );
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith( '' ),
      map( value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter( name as string ) : this.options.slice();
      } ),
    );
  }

  displayFn( user: { name: string } ): string {
    return user && user.name ? user.name : '';
  }

  private _filter( name: string ): { name: string }[] {
    const filterValue = name.toLowerCase();
    return this.options.filter( option => option.name.toLowerCase().includes( filterValue ) );
  }

  constructor(
    private readonly dialogRef: MatDialogRef<NewGroupDialogComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  close() {
    this.dialogRef.close();
  }

}
