import { Injectable} from "@angular/core";
import { Actions, Action, State, StateContext} from "@ngxs/store";
import { AddItemAction, ToggleItemAction} from "./todo-action";
import { TodoModel} from "./types/todo";

export interface TodoStateModel {
  items: TodoModel[];
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    items: []
  }
})
@Injectable()
export class TodoState {

  @Action(AddItemAction)
  addItem(ctx: StateContext<TodoStateModel>, action: AddItemAction) {
    const { name } = action;
    if(!name) return;

    const state = ctx.getState();
    const todoItem = {
      id: Math.floor(Math.random() * 1000),
      isDone: false,
      title: name,
    }

    ctx.setState({
      ...state,
      items: [...state.items, todoItem]
    })
  }

  @Action(ToggleItemAction)
  toggleItem(ctx: StateContext<TodoStateModel>, action: ToggleItemAction) {
    const state = ctx.getState();
    const newTodoItems = state.items.map((item: any) => {
      if(item.id === action.id) {
        return {
          ...item,
          isDone: !item.isDone
        }
      }
      return item;
    })

    ctx.setState({
      items: [...newTodoItems]
    })
  }
}

