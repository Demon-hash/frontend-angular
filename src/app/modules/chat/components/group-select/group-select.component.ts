import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, take } from "rxjs";
import { GroupsService } from "~/src/app/modules/chat/services/groups.service";
import { IGroup } from "~/src/app/types";
import { AppUrls } from "~/src/app/app-urls";
import { ChatUrls } from "~/src/app/modules/chat/chat-urls";

@Component({
  selector: 'app-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupSelectComponent implements OnInit {

  groups$: BehaviorSubject<IGroup[]> = new BehaviorSubject<IGroup[]>( [] );

  constructor(
    private readonly groupsService: GroupsService,
    private readonly router: Router
  ) {
    this.groupsService.getAll()
      .pipe(
        take( 1 )
      ).subscribe( groups => {
      this.groups$.next( groups );
    } );
  }

  ngOnInit(): void {
  }

  connect(id: string) {
    void this.router.navigateByUrl(`/${AppUrls.chat}/${ChatUrls.conversation}`, {
      state: {
        group: id
      }
    });
  }
}
