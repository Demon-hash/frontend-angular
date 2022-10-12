import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, take } from "rxjs";
import { GroupsService } from "~/src/app/modules/chat/services/groups.service";
import { IChatState, IGroup } from "~/src/app/types";
import { AppUrls } from "~/src/app/app-urls";
import { ChatUrls } from "~/src/app/modules/chat/chat-urls";
import { NewGroupSelectors } from "~/src/app/modules/chat/store/selectors/new-group.selectors";
import { Store } from "@ngrx/store";
import { ChatUserSelectors } from "~/src/app/modules/chat/store/selectors/chat-user.selectors";

@Component( {
  selector: 'app-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: [ './group-select.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class GroupSelectComponent implements OnDestroy {

  readonly groups$: BehaviorSubject<IGroup[]> = new BehaviorSubject<IGroup[]>( [] );
  readonly loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( true );
  readonly handler$ = this.store.select(NewGroupSelectors.selectNewGroupId).subscribe(id => {
    this.connect(id);
  });
  readonly user$ = this.store.select(ChatUserSelectors.selectUser);

  constructor(
    private readonly router: Router,
    private readonly store: Store<IChatState>,
    private readonly groupsService: GroupsService,
  ) {
    this.getGroupsList();
  }

  connect( id: string | undefined ) {
    if ( !id?.length ) {
      return;
    }
    void this.router.navigateByUrl( `/${ AppUrls.chat }/${ ChatUrls.conversation }`, {
      state: {
        group: id
      }
    } );
  }

  getGroupsList() {
    this.groupsService.getAll()
      .pipe(
        take( 1 )
      ).subscribe( groups => {
      this.groups$.next( groups );
      this.loading$.next( false );
    }, () => {
      this.loading$.next( false );
    } );
  }

  ngOnDestroy(): void {
    this.groups$.complete();
    this.groups$.unsubscribe();

    this.handler$.unsubscribe();

    this.loading$.complete();
    this.loading$.unsubscribe();
  }
}
