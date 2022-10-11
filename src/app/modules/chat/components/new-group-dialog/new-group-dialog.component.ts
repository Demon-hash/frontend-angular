import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { GroupsService } from "~/src/app/modules/chat/services/groups.service";
import { IChatState } from "~/src/app/types";
import { Store } from "@ngrx/store";
import { NewGroupActions } from "~/src/app/modules/chat/store/actions/new-group.actions";

@Component( {
  selector: 'app-new-group-dialog',
  templateUrl: './new-group-dialog.component.html',
  styleUrls: [ './new-group-dialog.component.scss' ]
} )
export class NewGroupDialogComponent implements OnInit {

  url: string = '';

  readonly form = this.formBuilder.group( {
    ico: [ '', [ Validators.required ] ],
    title: [ '', [ Validators.required ] ],
    desc: [ '' ],
    hidden: [ false ],
  } );


  onChange( event: any ) {
    const reader = new FileReader();
    const self = this;
    const image = new Image();

    reader.onload = function( event: ProgressEvent<FileReader> ) {
      if(typeof event.target?.result === 'string') {
        image.src = event.target.result;
      }

      image.onload = function() {
        self.url = image.src;
      }
    };
    reader.readAsDataURL( event.target.files[ 0 ] );
  }

  ngOnInit() {
  }

  constructor(
    @Inject( MAT_DIALOG_DATA ) public data: any,
    private readonly dialogRef: MatDialogRef<NewGroupDialogComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly groupsService: GroupsService,
    private readonly store: Store<IChatState>
  ) {
  }

  create() {
    if(!this.form.invalid) {
      this.store.dispatch(NewGroupActions.request({
        ico: `data:${this.url.split('data:')[1]}`,
        title: this.form.controls.title.value ?? "",
        hidden: this.form.controls.hidden.value ?? false
      }));
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

}
