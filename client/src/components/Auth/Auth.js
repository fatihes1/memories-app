import React, {useState} from "react";
import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from './Input';
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../store/actions/auth";


const initialState = {
firstName: '',
lastName: '',
email: '',
password: '',
confirmPassword: '',
};

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const history = useHistory();
	const handleSubmit = (event) => {
		event.preventDefault();
		
		if(isSignup){
			dispatch(signup(formData, history))
		} else {
			dispatch(signin(formData, history))
		}
	};
	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};
	
	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
	
	const switchMode = () => {
		setIsSignup((prevShowPassword) => !prevShowPassword);
		setShowPassword(false);
	};
	
	const googleSuccess = async (response) => {
		const token = response?.credential;
		const decoded = jwtDecode(token);
		
		const result = {
			email: decoded?.email,
			familyName: decoded?.family_name,
			givenName: decoded?.given_name,
			googleId: decoded?.sub,
			imageUrl: decoded?.picture,
			name: decoded?.name,
		}
		
		try {
			dispatch({ type: 'AUTH', data: { result, token} });
			setTimeout(() => {
				history.push('/')
			}, 1000);
		} catch (error) {
			console.log(error)
		}
	};
	
	const googleError = () => {
		console.log('Google Sign In was unsuccessful. Try again later');
	}
	
	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'>
					{isSignup ? 'Sign Up': 'Sign In'}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{
							isSignup && (
								<React.Fragment>
									<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
									<Input name="lastName" label="Last Name" handleChange={handleChange} half />
								</React.Fragment>
							)
						}
						<Input name="email" label="Email Address" handleChange={handleChange} type='email' />
						<Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text': 'password'} handleShowPassword={handleShowPassword} />
						{
							isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password'  />
						}
					</Grid>
					<GoogleLogin onSuccess={googleSuccess} onError={googleError}  />
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						{
							isSignup ? 'Sign Up' : 'Sign In'
						}
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Button onClick={switchMode}>{
								isSignup ? 'Already have an account?' : 'Don\'t have an account?'
							}</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	)
};

export default Auth;