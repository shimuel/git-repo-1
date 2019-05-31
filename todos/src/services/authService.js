import {setAuthentication, handleError} from '../actions/index'
import appService from './ajaxHandler'

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        //this.domain = domain || 'http://localhost:8080' // API server domain
        this.domain = domain || 'https://localhost:5001/';
        this.origin = 'http://localhost:3000/';
        //this.fetch = this.fetch.bind(this) // React binding stuff
        this.signInHandler = this.signIn.bind(this)
        this.signOutHandler = this.signOut.bind(this)
        this.setToken = this.setToken.bind(this)
        this.signInSuccess = this.signInSuccess.bind(this)
        //this.fetch = this.fetch.bind(this)
        //this.getProfile = this.getProfile.bind(this)
    }

    signIn(username, password, dispatch) {

         this.signOutHandler();

         var url = 'https://localhost:5001/users/authenticate';
         var origin = 'http://localhost:3000/';

         const pload = {
            method: 'POST',
            body: JSON.stringify({
                "firstName":"test",
                "lastName":"test",
                "username":username,
                "password":password
            })
        }

        const headers = {
            'Access-Control-Allow-Origin': origin,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         };

        return fetch(url, {
            headers,
            ...pload
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                return error
            }
        })
        .then(response => {
            if(! (response instanceof Error)){
                //alert('1')
                return response.json();
            }
        })
        .then(res => {
            if(res){
            this.signInSuccess(res) // Setting the token in localStorage
            return Promise.resolve(res);
            }else{
                return Promise.reject();
            }
        })

        //return appService('users/authenticate', null , null,setAuthentication,  handleError, pload, true)(dispatch);
    }


    
    signInSuccess(user){
        localStorage.setItem('id_token', user.token)
        //setAuthentication(true);
    }
   
    setToken(idToken) {
        // Saves user token to localStorage
        //localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    signOut() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }


    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }


    // fetch(url, options) {
    //     // performs api calls sending the required authentication headers
    //     const headers = {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': 'http://localhost:3000/',
    //     }

    //     // Setting Authorization header
    //     // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    //     // if (this.loggedIn()) {
    //     //     headers['Authorization'] = 'Bearer ' + this.getToken()
    //     // }

    //     return fetch(url, {
    //         headers,
    //         ...options
    //     })
    //     .then(this._checkStatus)
    //     .then(response => response.json())
    // }
}
