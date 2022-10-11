import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { SocketService } from "~/src/app/modules/chat/services/socket.service";
import { IUser, IUserWithGroupId } from "~/src/app/types";

@Component( {
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: [ './conversation.component.scss' ]
} )
export class ConversationComponent implements OnDestroy {

  readonly $user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({
    firstName: "",
    lastName: "",
    email: ""
  });

  constructor(
    public readonly socket$: SocketService,
    private readonly route: ActivatedRoute
  ) {
    this.route.data
      .subscribe( data => {
        const access: IUserWithGroupId | undefined = data?.['access'];
        if(access?.user && access?.group) {
          this.$user.next(access.user);
          this.socket$.join(access.group);
        }
      });
  }

  ngOnDestroy(): void {
    this.$user.complete();
    this.$user.unsubscribe();
  }
}
