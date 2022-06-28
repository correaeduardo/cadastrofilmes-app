import React from 'react'
import { Paper, Card, Typography, AppBar, Toolbar, Grid, Link, Button, makeStyles } from '@material-ui/core';
import {ArrowBackIos} from '@material-ui/icons';
import Controls from './controls/Controls';
import AddIcon from '@material-ui/icons/Add';
import Filme from '../pages/Filme';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#f2f2f2',
        
    },
    pageAppbar: {
        backgroundColor: '#FFF',
        paddingLeft :theme.spacing(4),
        
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2),
        backgroundColor: '#f2f2f2'
    },
    pageIcon:{
        borderRadius: '100%',
        display:'inline-block',
        padding:theme.spacing(1),
        color:'#3c44b1'
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

export default function Header() {

    const classes = useStyles();

    return (
        <>
        <Paper elevation={0} square>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    <ArrowBackIos fontSize="large" />
                </Card>
                
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div">
                        Filme</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        Filmes > Filmes</Typography>
                </div>
                
            </div>
        </Paper>
        <AppBar position="static" className={classes.pageAppbar}>
            <Toolbar>
                <Grid container spacing={8}
                    justifyContent="flex-start">
                    <Grid item >
                        <Link href="/" underline="hover">
                            FILME
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/genero" underline="hover">
                            GENERO
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/locacao" underline="hover">
                            LOCACAO
                        </Link>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>

            </Toolbar>
            
        </AppBar>
        </>
    )
}
