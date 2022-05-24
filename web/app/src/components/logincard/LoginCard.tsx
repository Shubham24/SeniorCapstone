
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import setUser from '../../redux/actions/setUser';
import dummyAuth from '../../auth/dummyAuth/dummyAuth';


function LoginCard() {

    // local styling
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
                width: 400,
                margin: `${theme.spacing(0)} auto`
            },
            loginBtn: {
                marginTop: theme.spacing(2),
                flexGrow: 1,
                backgroundColor: '#3f51b5',
                color: '#fff'
            },
            header: {
                textAlign: 'center',
                background: '#3f51b5',
                color: '#fff'
            },
            card: {
                marginTop: theme.spacing(10)
            }
        })
    );

    // get styling info
    const classes = useStyles();

    // create state's for the email and password field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // get history from react-router-dom
    const history = useHistory();

    // get redux dispatch
    const dispatch = useDispatch();

    /*
     * Function to handle/capture value changes in the email field.
     * Value captured is sent to setEmail() meanting the email state is set with the value captured in this method 
     * @param event : ChangeEvent from react
     */
    const handleEmailValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    /*
     * Function to handle/capture value changes in the password field.
     * Value captured is sent to setPassword() meanting the password state is set with the value captured in this method 
     * @param event : ChangeEvent from react
     */
    const handlePasswordValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }


    /**
     * Function that will handle logging in as a user
     * @param email : email entered in by the user 
     * @param password : password entered in by the user
     */
    const handleLogin = (email: string, password: string) => {

        // use dummyAuth to try to login
        const user = dummyAuth.login(email, password);

        // if login was successful...
        if (user !== null) {

            // set the user in the Redux store
            dispatch(setUser(user));

            // send user to the dashboard page
            history.push('/dashboard');
        }
    }

    // return front end material
    return (
        <div>
            <form className={classes.container} noValidate autoComplete="off">
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title="Playfair (Login)" />
                    <CardContent>
                        <div>
                            <TextField
                                fullWidth
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="Email"
                                margin="normal"
                                onChange={handleEmailValueChange}
                            />
                            <TextField
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                margin="normal"
                                onChange={handlePasswordValueChange}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="large" className={classes.loginBtn} onClick={() => {handleLogin(email,password)}}>Login</Button>
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}

export default LoginCard
