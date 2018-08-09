import appService from './ajaxHandler'
import AuthService from './authService'
import {fetchTodos, receivedTodos, updateTodo, handleError} from '../actions/index'

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
    }
}