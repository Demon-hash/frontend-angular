import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { GroupsService } from "~/src/app/modules/chat/services/groups.service";
import { IChatState } from "~/src/app/types";
import { Store } from "@ngrx/store";
import { NewGroupActions } from "~/src/app/modules/chat/store/actions/new-group.actions";
import { ChatUserSelectors } from "~/src/app/modules/chat/store/selectors/chat-user.selectors";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

@Component( {
  selector: 'app-new-group-dialog',
  templateUrl: './new-group-dialog.component.html',
  styleUrls: [ './new-group-dialog.component.scss' ]
} )
export class NewGroupDialogComponent implements OnDestroy {

  url: string = '';
  id: string = '';

  private readonly ERROR_LOGO_UPLOAD = '';
  private readonly BTN_CLOSE = '';

  readonly handler$ = this.store.select( ChatUserSelectors.selectUserId )
    .subscribe( id => this.id = id );

  readonly form = this.formBuilder.group( {
    ico: [ '', [ Validators.required ] ], title: [ '', [ Validators.required ] ],
    desc: [ '' ], hidden: [ false ],
  } );


  constructor(
    @Inject( MAT_DIALOG_DATA ) public data: any,
    private readonly dialogRef: MatDialogRef<NewGroupDialogComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly groupsService: GroupsService,
    private readonly store: Store<IChatState>,
    private readonly snackBar: MatSnackBar,
    private readonly translateService: TranslateService
  ) {
    this.ERROR_LOGO_UPLOAD = this.translateService.instant( 'group.create.logo-upload-error' );
    this.BTN_CLOSE = this.translateService.instant( 'btn.close' );
  }

  create() {
    if ( !this.form.invalid ) {
      this.store.dispatch( NewGroupActions.request( {
        ownerId: this.id,
        ico: `data:${ this.url.split( 'data:' )[ 1 ] }`,
        title: this.form.controls.title.value ?? "",
        hidden: this.form.controls.hidden.value ?? false
      } ) );
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

  onLogoChange( event: any ) {
    try {
      const reader = new FileReader();
      const image = new Image();

      reader.onload = ( event: ProgressEvent<FileReader> ) => {
        if ( typeof event.target?.result === 'string' && event.target.result.length ) {
          image.src = event.target.result;
        }

        image.onload = () => {
          if ( image.width !== image.height || (image.width < 256 || image.width > 256) || (image.height < 256 || image.height > 256) ) {
            this.showLogoLoadError();
            return;
          }
          this.url = image.src;
        }
      };

      if ( Math.floor( event?.target?.files?.[ 0 ]?.size / 1048576 ) > 2 ) {
        this.showLogoLoadError();
        return;
      }

      reader.readAsDataURL( event.target.files[ 0 ] );
    } catch ( e ) {
    }
  }

  private showLogoLoadError() {
    this.snackBar.open( this.ERROR_LOGO_UPLOAD, this.BTN_CLOSE, {
      duration: 5000
    } );
    this.form.controls.ico.reset( '' );
    this.url = '';
  }

  ngOnDestroy() {
    this.handler$.unsubscribe();
  }

}
