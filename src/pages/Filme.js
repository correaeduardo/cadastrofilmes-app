import React, { useState, useEffect } from 'react';
import EmployeeForm from "./FilmeForm";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Grid} from '@material-ui/core';
import useTable from "../components/useTable";
import * as Filmeservice from "../services/Filmeservice";
import Controls from "../components/controls/Controls";
import Popup from "../components/Popup";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import {Edit, Delete} from '@material-ui/icons';
import Checkbox from '../components/controls/Checkbox';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    newButton: {
        position: 'absolute',
        bottom: '135px',
        right: '-10px'
    },
    pageSelect:{
        position: 'absolute',
        bottom: '4px',
        right: '70px'
    }

}))


const headCells = [
    { id: 'checkbox', } ,
    { id: 'fullName', label: 'Nome' },
    { id: 'genre', label: 'Genero' },
    { id: 'date', label: 'Data de Criação' },
    { id: 'Active', label: 'Ativo' },
    { id: 'actions', label: '', disableSorting: true }
]

export default function Filme() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0)
            Filmeservice.insertEmployee(employee)
        else
            Filmeservice.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(Filmeservice.getAllFilme())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Filmeservice.deleteEmployee(id);
        setRecords(Filmeservice.getAllFilme())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>

            <Paper className={classes.pageContent}>
                <Toolbar>
                <Grid container
                    direction="row">
                    <Grid >
                    <Controls.Input
                        label="Buscar Filme"
                        onChange={handleSearch}
                    />
                      </Grid>
                      <Grid  className={classes.pageSelect}>
                      <Controls.Select
                        name="genreId"
                        label="Genero"
                        onChange={handleSearch}
                        options={Filmeservice.getGeneroCollection()}
                        
                        />
                      </Grid>
                </Grid>
                    <Controls.Button
                        text="CADASTRAR FILME"
                        variant="contained"
                        startIcon={''}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        
                    />
                </Toolbar>
            </Paper>
            <Paper className={classes.pageContent}>


                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell><Checkbox/></TableCell>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.genre}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.Active}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            onClick={() => { openInPopup(item) }}>
                                            <Edit fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <Delete fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
            </Paper>
            <Popup
                title="Cadastro de Filme"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
