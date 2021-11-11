import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useStore, useStoreActions, useStoreState} from "easy-peasy";

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const service = useStoreState((state) => state.service);
    const createService = useStoreActions((actions) => actions.create);
    const updateService = useStoreActions((actions) => actions.update);

    const validationSchema = Yup.object().shape({
        serviceName: Yup.string()
            .required('Service name is required'),
        uri: Yup.string()
            .required('Service uri is required')
    });

    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function create (data) {
        createService(data);
        history.push('.');
    }

    function update (data) {
        updateService(data);
        history.push('.');
    }

    function onSubmit(data) {
        return isAddMode
            ? create(data)
            : update(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset} >
            <h1>{isAddMode ? 'Add Service' : 'Edit Service'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Service Name</label>
                    <input value={service.serviceName} disabled={!isAddMode} name="serviceName" type="text" ref={register} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Service URI</label>
                    <input value={service.uri} name="uri" type="text" ref={register} className={`form-control ${errors.uri ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.uri?.message}</div>
                </div>
            </div>

            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    )
}

export { AddEdit };