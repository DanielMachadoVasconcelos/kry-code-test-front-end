import config from 'config';
import {action, createStore, thunk} from 'easy-peasy'
import axios from 'axios';

const baseUrl = `${config.baseUri}/services`;
const headers = {
    'Access-Control-Allow-Origin' : '*',
    'Content-Type': 'application/json',
    auth: {
        username: 'user',
        password: 'password'
    }
}

export const store = createStore({
    services: [],
    getAll: thunk((actions) => {
       axios.get(`${baseUrl}/`, { headers })
            .then(function (response) {
                if (response.status == 200) {
                    actions.addService(response.data);
                }
            })
           .catch(function (error) {
                console.log(error);
            });
    }),
    addService: action((state, payload) => {
        state.services.push(payload)
    }),
    removeService: action(((state, payload) => {
        state.services.filter(function (value) {
            return value.id != state.id
        })
    })),
    create: thunk((actions, payload) => {
        const {data} = axios.post(`${baseUrl}/`, payload, { headers })
            .then(function (response) {
                if (response.status == 200) {
                    actions.addService(payload);
                }
            }).catch(function (error) {
                console.log(error);
            });
    }),
    update: thunk((actions, payload) => {
        const {data} = axios.put(`${baseUrl}/${payload.name}`, payload.uri, { headers })
            .then(function (response) {
                if (response.status == 200) {
                    actions.addService(payload);
                }
            }).catch(function (error) {
                console.log(error);
            });
    }),
    delete: thunk((actions, payload) => {
        const {data} = axios.delete(`${baseUrl}/${payload.id}`, { headers })
            .then(function (response) {
                if (response.status == 200) {
                    actions.removeService(payload);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    })
})
