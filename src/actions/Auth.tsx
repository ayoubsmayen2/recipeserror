import React, { Component} from "react"
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { TOASTR_OPTIONS } from '../constants/Common'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/ActionTypes'
import toastr from 'toastr';

axios.defaults.withCredentials = true;

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
/*export default class Account extends Component{


     
      render(){
           return(
             <div>
 

    <p>hello world</p>
                 </div>
                 
                 
                 )
      }
}*/

export const loginRequest = (username:any) => {
    return {
        type: LOGIN_REQUEST,
        payload: username
    }
}

export const loginSuccess = (user:any) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export const loginFailure = (error:any) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

export const setAuthorizationToken = (token:any) => {
    if (token) {
       // alert(token);
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}
//http://localhost:8000/apiprof/auth/login/username
///api-token-auth/
export const login = (username : any, email : any,password:any) => {
    return (dispatch : any) => {
        dispatch(loginRequest(email)) //username
        axios.post('/api-token-auth/', { username,email, password })
            .then((res) => {

                console.log(res.data.user);
                console.table(res.data.user);


                let token = res.data.token

               // alert(res.data);
                localStorage.setItem('jwtToken', token)
                localStorage.setItem("umi",res.data.user.username);
                
                setAuthorizationToken(token)
                dispatch(loginSuccess(jwtDecode(token)))
                toastr.success(`Logged in as <b>${res.data.user.username}</b>.`);

                
            })
            .catch((err) => {
                dispatch(loginFailure(err.response))
                if (err.response.status === 400 && err.response.data.non_field_errors[0] === 'Unable to log in with provided credentials.') {
                    toastr.error("Log in failed, please check your credentials again.")
                }
            })
    }
}

export const logout = () => {
    return (dispatch :any) => {
        localStorage.removeItem('jwtToken')
        setAuthorizationToken(false)
        dispatch(loginSuccess({}))
    }
}

export const renewAuthorizationToken = (token:any) => {
    return (dispatch :any) => {
        axios.post('/api-token-refresh/', { token })
    }
}

export const checkAuthorizationToken = (token:any) => {
    return (dispatch :any) => {
        axios.post('/api-token-verify/', { token })
            .then((res) => {
                dispatch(renewAuthorizationToken(res.data.token))
            })
            .catch((err) => {
                if (err.response.status === 400 && err.response.data.non_field_errors[0] === 'Signature has expired.') {
                    dispatch(logout())
                   // dispatch(fetchProducts())
                }
            })
    }
}

export const userSignupRequest = (userInfo:any) => {
    return (dispatch : any ) => {

        console.log(userInfo);
        console.table(userInfo);
        axios.post('/cart/cart0/users1/',userInfo,

        {
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            }
        }
       
        )
            .then((res) => {
                localStorage.setItem("umi",res.data.username);
                toastr.success("Welcome! Your account is available now.")
            })
            .catch((err) => {
                if (err.response.status === 400 && err.response.data.username === 'A user with that username already exists.') {
                    toastr.error("A user with that username already exists.")
                }
                else  {
                    toastr.error("error  accoured from front to back "   +err);
                }
            })
    }
}