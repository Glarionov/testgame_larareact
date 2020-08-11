import axios from 'axios';

import {returnErrors} from "./errorActions";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL
} from "./types";

export const loadUser1 = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token
    }

    axios.get('/api/user', config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(error.data, error.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        });
}

export const loadUser3 = () => (dispatch, getState) => {
    // User loading
    // dispatch({ type: USER_LOADING });
    //
    // axios
    //     .get('/api/auth/user', getState().auth.token)
    //     .then(res =>
    //         dispatch({
    //             type: USER_LOADED,
    //             payload: res.data
    //         })
    //     )
    //     .catch(err => {
    //         dispatch(returnErrors(err.response.data, err.response.status));
    //         dispatch({
    //             type: AUTH_ERROR
    //         });
    //     });
};


// export const loadUser = function () {
//
// }

export const  loadUser =   (firstName) => {
    // dispatch({type: USER_LOADING});

    // const token = getState().auth.token;

    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU5Njk3ODM3OSwiZXhwIjoxNTk2OTgxOTc5LCJuYmYiOjE1OTY5NzgzNzksImp0aSI6InF1VXJKdVA2M0JXVGZMeEMiLCJzdWIiOjUsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.5hQgy1wtsaVciRwyPUPSBgh7aHe8t4URApcYFlyFR_0"')
    let token = localStorage.getItem('token');
    console.log('token',token); //todo r
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token
    }

    let rData = axios.get('/api/user?token=' + token, config)
        .then(
            res => {
                console.log('res',res); //todo r
                let resData = res.data;

                console.log('resData',resData); //todo r
                dispatch({
                    type: USER_LOADED,
                    payload: resData
                    // comments,
                    // postId
                });

                return resData;
            }

            // res => dispatch({
            // type: USER_LOADED,
            // payload: res.data
        // })
        )
        .catch(err => {
            // dispatch(returnErrors(error.data, error.response.status))
            // dispatch({
            //     type: AUTH_ERROR
            // })
        });
    console.log('rData',rData); //todo r
    return {
        type: 'ACTION_CHANGE_FIRST_NAME',
        payload:
            {
                firstName: firstName
            }

    }
};
