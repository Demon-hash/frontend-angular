import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { SocketService } from "~/src/app/modules/chat/services/socket.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { IUser } from "~/src/app/types";

@Component( {
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class MessagesComponent implements OnDestroy {

  @Input()
  user: BehaviorSubject<IUser> | undefined;

  handler$: Subscription | undefined;
  messages$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>( [] );

  form = this.formBuilder.group( {
    message: [ '' ],
  } );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly socket: SocketService
  ) {
    this.handler$ = this.socket?.getMessage()
      .subscribe( message => this.messages$.next( [
        ...this.messages$.value,
        message
      ] ) );
  }

  ngOnDestroy(): void {
    this.messages$.complete();
    this.messages$.unsubscribe();
    this.handler$?.unsubscribe();
  }

  send() {
    if ( !this.form.invalid && this.form.controls.message.value?.trim()?.length ) {
      this.socket?.sendMessage( `${ this.form.controls.message.value }` );
      this.form.controls.message.reset( '' );
    }
  }

  edit() {

  }

}
