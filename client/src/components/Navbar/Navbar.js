import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import React, {useEffect, useState} from "react";
import useStyles from "./styles";
import {Link, useHistory, useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';

const Navbar = () => {
	const classes = useStyles();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const dispatch = useDispatch();
	const history = useHistory();
	// After signing we use redirect so we have to update navbar with current localstorage values
	const location = useLocation();
	
	
	useEffect(() => {
		const token = user?.token;
		// JWT check
		if(token) {
			const decodedToken = decode(token);
			
			if(decodedToken.exp * 1000 < new Date().getTime()) {
				logoutHandler();
			}
		}

		setUser(JSON.parse(localStorage.getItem('profile')));

	}, [location])
	
	const logoutHandler = () => {
		dispatch({ type: 'LOGOUT' });
		
		history.push('/');
		setUser(null);
	};
	
	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<Link to="/" className={classes.brandContainer}>
				<img  src={memoriesText} alt="icon" height="45px" />
				<img className={classes.image} src={memoriesLogo} alt="icon" height="40px"/>
			</Link>
			<Toolbar className={classes.toolbar}>
				{user?.result ? (
					<div className={classes.profile}>
						<Avatar className={classes.purple} alt={user?.result.name}
								src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
						<Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
						<Button variant="contained" className={classes.logout} color="secondary" onClick={logoutHandler}>Logout</Button>
					</div>
				) : (
					<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
				)}
			</Toolbar>
		</AppBar>
	)
};

export default Navbar;