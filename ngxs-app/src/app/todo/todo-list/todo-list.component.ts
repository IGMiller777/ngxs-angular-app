import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TodoModel} from "../types/todo";
import {Select, Store} from "@ngxs/store";
import {TodoSelectors} from "../todo-selectors";
import {AddItemAction, ToggleItemAction} from "../todo-action";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Select(TodoSelectors.todoItems) todoItems$!: Observable<TodoModel[]>;

  newItemName!: string;
  items: TodoModel[] = [...new Array(10)].map((_, index) => ({
    id: index + 1,
    isDone: false,
    title: `Todo ${index + 1}`,
  }));


  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  trackById(index: number, item: TodoModel): number {
    return item.id
  }

  addItem() {
    this.store.dispatch(new AddItemAction(this.newItemName));
    this.newItemName = '';
  }

  toggleItem(todoItem: TodoModel) {
    this.store.dispatch(new ToggleItemAction(todoItem.id));
  }

}
