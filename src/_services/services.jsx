import config from 'config';
import {action, createStore, thunk} from 'easy-peasy'
import axios from 'axios';

const baseUrl = `${config.baseUri}/services`;
const username = 'user';
const password = 'password';
const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
const authorization = `Basic ${encodedBase64Token}`;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': authorization,
}

export const store = createStore({
    services: [],
    service: {},
    setService: action((state, payload) => {
        state.service = payload;
    }),
    clearService: action((state) => {
        state.service = {};
    }),
    addService: action((state, payload) => {
        state.services.push(payload)
    }),
    setServices: action((state, payload) => {
        state.services = payload
    }),
    removeService: action(((state, payload) => {
        state.services = state.services.filter(value => value.serviceName === payload.serviceName);
    })),
    getAll: thunk((actions) => {
        axios.get(`${baseUrl}/`, {headers})
            .then(response => {
                if (response.status == 200) {
                    actions.setServices(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }),
    getServiceById: thunk((actions, payload) => {
        axios.get(`${baseUrl}/${payload}`, {headers})
            .then(response => {
                if (response.status == 200) {
                    actions.setService(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
                actions.clearService()
            });
    }),
    create: thunk((actions, payload) => {
         axios.post(`${baseUrl}/`, payload, {headers})
            .then(function (response) {
                if (response.status == 201) {
                    actions.addService(response.data);
                }
            }).catch(function (error) {
                console.log(error);
            });
    }),
    update: thunk((actions, payload) => {
         axios.put(`${baseUrl}/${payload.serviceName}`, payload.uri, {headers})
            .then(function (response) {
                if (response.status == 200) {
                    actions.addService(response.data);
                }
            }).catch(function (error) {
                console.log(error);
            });
    }),
    delete: thunk((actions, payload) => {
        axios.delete(`${baseUrl}/${payload.serviceName}`, {headers})
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
