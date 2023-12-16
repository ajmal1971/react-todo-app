/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: 'To Do 1',
            isCompleted: false
        }
    ],
    createTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deletedTodo: (id) => { },
    completeTodo: (id) => { }
});

export const TodoProvider = TodoContext.Provider;

export function useTodoContext() {
    return useContext(TodoContext);
}