import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useStoreActions, useStoreState} from "easy-peasy";

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const [service, setService] = useState({});
    const services = useStoreState((state) => state.services);
    const createService = useStoreActions((actions) => actions.create);
    const updateService = useStoreActions((actions) => actions.update);

    // form validation rules
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Service name is required'),
        uri: Yup.string()
            .required('Service uri is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createService(data)
            : updateService(id, data);
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Service' : 'Edit Service'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Service Name</label>
                    <input name="name" type="text" ref={register} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Service URI</label>
                    <input name="uri" type="text" ref={register} className={`form-control ${errors.uri ? 'is-invalid' : ''}`} />
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