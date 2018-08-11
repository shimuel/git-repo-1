import appService from './ajaxHandler'
import AuthService from './authService'
import {fetchTodos, receivedTodos, addTodo, updateTodo, resetTodos, handleError} from '../actions/index'

export const todoAPI = {
    
    getAll(){
        
        const auth = new AuthService();
        return appService('api/todo', auth.getToken() ,fetchTodos, receivedTodos, handleError);
    },
    
    updateTodo(todo, dispatch){

        const {
            inEdit,
            ...todoWithOutEdit
        } = todo;

        const pload = {
            method: 'PUT',
            body: JSON.stringify(todoWithOutEdit)
        }
        console.log('PUT called..'+JSON.stringify(pload));
        const auth = new AuthService();
        //requestEndpoint, token, preAction, postAction, errCallback, pload
         appService('api/todo/'+todo.id, auth.getToken() ,null, null, handleError, pload)(dispatch).then(dispatch(updateTodo(todo)));
    },

    addTodo(todo, dispatch){

        const pload = {
            method: 'POST',
            body: JSON.stringify(todo)
        }
        console.log('POST called..'+JSON.stringify(pload));
        const auth = new AuthService();
        //requestEndpoint, token, preAction, postAction, errCallback, pload
         appService('api/todo/', auth.getToken() ,null, addTodo, handleError, pload)(dispatch);
    },

    deleteTodo(id, dispatch){

        const pload = {
            method: 'DELETE'
        }
        console.log('DELETE called..i...'+id);
        const auth = new AuthService();
        //requestEndpoint, token, preAction, postAction, errCallback, pload
         appService('api/todo/'+id, auth.getToken() ,resetTodos, this.getAll.bind(this), handleError, pload)(dispatch)
    }
}