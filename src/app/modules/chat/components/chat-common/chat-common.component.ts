import { Component, OnDestroy } from '@angular/core';
import { ChatService } from "~/src/app/modules/chat/services/chat.service";
import { ActivatedRoute, Data } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { SignUpInterface } from "~/src/app/modules/auth/store";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component( {
  selector: 'app-chat-common',
  templateUrl: './chat-common.component.html',
  styleUrls: [ './chat-common.component.scss' ]
} )
export class ChatCommonComponent implements OnDestroy {

  message: string = '';
  messages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>( [] );

  private readonly user$: BehaviorSubject<SignUpInterface> = new BehaviorSubject<SignUpInterface>( {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  } );

  readonly form = this.formBuilder.group( {
    message: [ '', [ Validators.required ] ],
  } );

  private readonly data$ = this.route.data
    .subscribe( ( data: Data ) => {
      this.user$.next( data[ 'user' ] );
    } );

  readonly messageHandler$ = this.chat$
    .getMessage()
    .subscribe( message => this.messages.next( [
      ...this.messages.value,
      message
    ] ) );

  constructor(
    private readonly chat$: ChatService,
    private readonly route: ActivatedRoute,
    private readonly translateService: TranslateService,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  send() {
    if ( !this.form.invalid ) {
      const { firstName, lastName } = this.user$.value ?? {};
      this.chat$.sendMessage( `${ firstName } ${ lastName }: ${this.form.controls.message.value}` );
      this.form.controls.message.reset('');
    }
  }

  ngOnDestroy(): void {
    this.messageHandler$.unsubscribe();
    this.data$.unsubscribe();
    this.user$.unsubscribe();
  }
}
