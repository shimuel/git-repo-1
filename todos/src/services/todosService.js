import appService from './ajaxHandler'
export const todoAPI = {

    getAll(){
        return appService('api/todo');
    }
    
}