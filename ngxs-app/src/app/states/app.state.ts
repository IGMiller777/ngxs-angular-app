import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';
import { AddUsers, DeleteUsers, GetUsers, UpdateUsers } from "../actions/app.action";
import {DataService} from "../data.service";


export class UserStateModel {
  users: any;
}

@State<UserStateModel>({
  name: 'myappstate',
  defaults: {
    users: []
  }
})

@Injectable()
export class AppState {

  constructor(private dataService: DataService) {
  }

  @Selector()
  static selectStateData(state: UserStateModel) {
    return state.users
  }

  @Action(GetUsers)
  getDataFromUsers(ctx: StateContext<UserStateModel>) {
    return this.dataService.fetchUsers().pipe(tap(returnData => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        users: returnData
      })
    }))
  }
  @Action(UpdateUsers)
  addDataToState(ctx: StateContext<UserStateModel>, {payload} : AddUsers){
    return this.dataService.addUsers(payload).pipe(tap(returnData => {
      const state = ctx.getState();
      ctx.patchState({
        users: [...state.users, returnData]
      })
    }))
  }

  @Action(UpdateUsers)
  updateDataOfState(ctx: StateContext<UserStateModel>, { payload, id, i }: UpdateUsers) {
    return this.dataService.updateUser(payload, i).pipe(tap(returnData => {
      const state=ctx.getState();

      const userList = [...state.users];
      userList[i]=payload;

      ctx.setState({
        ...state,
        users: userList,
      });
    }))
  }

  @Action(DeleteUsers)
  deleteDataFromState(ctx: StateContext<UserStateModel>, { id }: DeleteUsers) {
    return this.dataService.deleteUser(id).pipe(tap(returnData => {
      const state=ctx.getState();
      console.log("The is is",id)
      //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
      const filteredArray=state.users.filter((contents: any)=>contents.id!==id);

      ctx.setState({
        ...state,
        users:filteredArray
      })
    }))
  }

}
