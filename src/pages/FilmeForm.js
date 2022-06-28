import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import * as Filmeservice from "../services/Filmeservice";



const initialFValues = {
    id: 0,
    fullName: '',
    genre: '',
    date: '',
    Active: '',
    genreId: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('genreId' in fieldValues)
            temp.genreId = fieldValues.genreId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
        
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container justifyContent="center" alignItems="center">

                    <Controls.Switch
                        name="Active"
                        label="Filme Ativo"
                        value={values.Active}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="fullName"
                        label="Nome"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Select
                        name="genreId"
                        label="Genero"
                        value={values.genreId}
                        onChange={handleInputChange}
                        options={Filmeservice.getGeneroCollection()}
                        error={errors.genreId}
                    />
            <Grid container xs={12} justifyContent="flex-end" >
                    <Controls.Button
                        variant="text"
                        text="Cancelar"
                        color="default"
                        onClick={resetForm} />
                    <Controls.Button
                        variant="text"
                        type="submit"
                        text="Salvar" />
            </Grid>


            </Grid>
        </Form>
    )
}
