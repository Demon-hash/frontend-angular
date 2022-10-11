import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { Api } from "~/src/app/api";
import { SessionService } from "~/src/app/services/session.service";
import { IGroup, IID } from "~/src/app/types";

@Injectable({
  providedIn: "root"
})
export class GroupsService {
  constructor(
    private readonly api: Api,
    private readonly session: SessionService
  ) {
  }

  getAll(): Observable<IGroup[]> {
    return from(this.api.getGroups(this.session.access() ?? ""));
  }

  create(group: IGroup): Observable<IID> {
    return from(this.api.createGroup(group, this.session.access() ?? ""));
  }
}
