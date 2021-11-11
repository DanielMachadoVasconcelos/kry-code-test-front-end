import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useStoreActions, useStoreState} from "easy-peasy";

function List({ match }) {

    const { path } = match;
    const services = useStoreState((state) => state.services);
    const setServices = useStoreActions((actions) => actions.addService);
    const getAllServices = useStoreActions((actions) => actions.getAll);
    const deleteService = useStoreActions((actions) => actions.delete)

    useEffect(() => {
        getAllServices();
    }, []);
    console.log(services)
    return (
        <div>
            <h1>Services</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Service</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{ width: '20%' }}>Name</th>
                    <th style={{ width: '20%' }}>URI</th>
                    <th style={{ width: '20%' }}>Username</th>
                    <th style={{ width: '30%' }}>Created At</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {services && services.map((service, index) =>
                    <tr key={index}>
                        <td>{service.serviceName}</td>
                        <td>{service.uri}</td>
                        <td>{service.username}</td>
                        <td>{service.createdAt}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`${path}/edit/${service.serviceName}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                            <button onClick={() => deleteService(service)} className="btn btn-sm btn-danger btn-delete-service" disabled={service.isDeleting}>
                                {service.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!services &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="spinner-border spinner-border-lg align-center"></div>
                        </td>
                    </tr>
                }
                {services && !services.length &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="p-2">No Services To Display</div>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    )
}

export { List };