import React, { useState } from 'react';
import { Grid, Button, FormControl, OutlinedInput, InputLabel, FormHelperText, InputAdornment, IconButton, Card } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import '../styles/Login.css'
import {Navigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Signup({hasLoggedIn, setHasLoggedIn}) {
    //user value from the form
    const [user, setUsername] = useState("");
    //warning when the user tries to input worng user patterns
    const [userWarning, setUserWarning] = useState("");

    //pwd value from the form
    const [pwd, setPwd] = useState("");
    //warning when the user tries to input wrong password patterns
    const [pwdWarning, setPwdWarning] = useState("");

    // confirm password value from the form
    const [confirmPwd, setConfirmPwd] = useState("");
    //warning when the user tries to input wrong password patterns
    const [confirmPwdWarning, setConfirmPwdWarning] = useState("");

    // state to check if the user has successfully signed up
    const [successfulSignup, setSuccessfulSignup] = useState(false);


    //checks the user input on every change in form fields
    function handleChange(e) {
        //clear every warnings
        setUserWarning("");
        setPwdWarning("");
        setConfirmPwdWarning("");

        //get the value attribute of the target that created event e
        const value = e.target.value;
        const pattern = /^[0-9a-zA-Z]*$/;

        //check for the username
        if (e.target.name === "username") {
            //check whether its empty or not and set the warning
            if (value === "") {
                setUsername("");
                setUserWarning("Username is required.");
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(value)) {
                setUserWarning("Username must be alphanumerical.");
                return false;
            }
            //set the username
            setUsername(e.target.value);
        }
        if (e.target.name === "password") {
            //check whether its empty or not and set the warning
            if (value === "") {
                setPwd("");
                setPwdWarning("Password is required.");
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(value)) {
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
            //set the password
            setPwd(e.target.value);
        }

        if (e.target.name === "confirmPassword") {
            //check whether its empty or not and set the warning
            if (value === "") {
                setConfirmPwd("");
                setConfirmPwdWarning("Confirm Password is required.");
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(value)) {
                setConfirmPwdWarning("Confirm Password must be alphanumerical.");
                return false;
            }
            //set the confirm password
            setConfirmPwd(e.target.value);
        }

        return true;
    }


    function handleSignUp (){
        //clear every warnings
        setUserWarning("");
        setPwdWarning("");
                
        //check if the user and pwd is empty or not
        if (user === "" || pwd === "") {
            if (user === "") {
                setUserWarning("username is required.");
            }
            if (pwd === "") {
                setPwdWarning("password is required.");
            }
            return;
        }
        //size constraint for the user and pwd
        if ((user.length < 8 || user.length > 30) && (pwd.length < 10 || pwd.length > 30) && (confirmPwd.length < 10 || confirmPwd.length > 30)) {
            setUserWarning("Username must be 8 to 30 letters long.");
            setPwdWarning("Password must be 10 to 30 letters long.");
            setConfirmPwdWarning("Confirm Password must be 10 to 30 letters long.");
            return false;
        }
        
        if (user.length < 8 || user.length > 30) {
            setUserWarning("Username must be 8 to 30 letters long.");
            return false;
        }
        
        if (pwd.length < 10 || pwd.length > 30) {
            setPwdWarning("Password must be least 10 to 30 letters long.");
            return false;
        }
        if (confirmPwd.length < 10 || confirmPwd.length > 30) {
            setConfirmPwdWarning("Confirm Password must be least 10 to 30 letters long.");
            return false;
        }

        const pattern = /^[0-9a-zA-Z]*$/;

        //check whether values matches the pattern or not
        if (!pattern.test(user) || !pattern.test(pwd)) {
            if (!pattern.test(user) && !pattern.test(pwd) && !pattern.test(confirmPwd)) {
                setUserWarning("Username must be alphanumerical.");
                setPwdWarning("Password must be alphanumerical.");
                setConfirmPwdWarning("Confirm Password must be alphanumerical.");
                return false;
            }
            if (!pattern.test(user)) {
                setUserWarning("Username must be alphanumerical.");
                return false;
            }

            if (!pattern.test(pwd)) {
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
            
            if(!pattern.test(confirmPwd)){
                setConfirmPwdWarning("Confirm Password must be alphanumerical.");
                return false;
            }
        }


        //check whether the pwd and confirm pwd matches or not
        if (pwd !== confirmPwd) {
            setPwdWarning("New Password and Confirm Password must be same.");
            setConfirmPwdWarning("New Password and Confirm Password must be same.");
            return false;
        }

        // ################################################################################################################
        // FETCH REQUEST TO SIGN UP
        // ################################################################################################################

        fetch('https://kanban-backend-server.herokuapp.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ user, pwd })
        }).then(response => {
            //check the response
            if (response.success === 500) {
                return undefined;
            }
            return response.json();
        })
        .then(data => {
            //on successful response update the Global Storage using dispatch
            if (data.success === false) {
                //if the the credentials are wrong then clear the fields and throw warning
                setPwd("");
                setUsername("");
                setUserWarning("Username already taken. Please login!");
                NotificationManager.error("Username already taken. Please login!", "Error", 3000);
            } else {
                NotificationManager.success("Signup Successful! Click here to go to login page.", "Success", 3000, () => {
                    setSuccessfulSignup(true); //set the successfulSignUp to true
                });
                
            }
        });
    }

    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    return (
        <div className = 'login__container'>
        {hasLoggedIn && <Navigate to = '/home' />}  {/* if the user has logged in then redirect to home page */}
        { successfulSignup && <Navigate to={`/`} push = {true}></Navigate>} {/* if the user has reset the password then redirect to login page */}
        <Card color="primary" variant="outlined">
            <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="username" variant="outlined" error={userWarning !== ""}>Username</InputLabel>
                    <OutlinedInput
                        id="username"
                        type="text"
                        name="username"
                        label="Username"
                        error={userWarning !== ""}
                        aria-describedby="my-helper-text-user"
                        value={user}
                        onChange={handleChange}
                    />
                    <FormHelperText id="my-helper-text-user" error={userWarning !== ""}>{userWarning}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="password" variant="outlined" error={pwdWarning !== ""}>Create New Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Create New Password"
                        error={pwdWarning !== ""}
                        aria-describedby="my-helper-text-pwd"
                        value={pwd}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setshowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility style = {{fill: 'lightgray'}}/> : <VisibilityOff style = {{fill: 'lightgray'}}/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="my-helper-text-pwd" error={pwdWarning !== ""}>{pwdWarning}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="confirm" variant="outlined" error={confirmPwdWarning !== ""}>Confirm New Password</InputLabel>
                    <OutlinedInput
                        id="confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        label="Confirm New Password"
                        error={confirmPwdWarning !== ""}
                        aria-describedby="my-helper-text-pwd"
                        value={confirmPwd}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <Visibility style = {{fill: 'lightgray'}}/> : <VisibilityOff style = {{fill: 'lightgray'}}/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="my-helper-text-pwd" error={confirmPwdWarning !== ""}>{confirmPwdWarning}</FormHelperText>
                </FormControl>
            </Grid>



            <Grid container item direction="column" justify="center" alignItems="center" xs={12} style={{ padding: "1em" }}>
                <Button variant="contained" style={{ backgroundColor: "#006C65", color: "#FFFFFF" }} onClick={handleSignUp}>
                    Sign Up
                </Button>
                    <Link to = '/' className = 'forgot__password'> Go to Login </Link>
            </Grid>
        </Card>
        </div>
    );
}

export default Signup;