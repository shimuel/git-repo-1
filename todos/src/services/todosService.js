import appService from './ajaxHandler'
import AuthService from './authService'
import {fetchTodos, receivedTodos, handleError} from '../actions/index'

export const todoAPI = {
    
    getAll(){
        const auth = new AuthService();
        return appService('api/todo', auth.getToken() ,fetchTodos, receivedTodos, handleError);
    }
    
}