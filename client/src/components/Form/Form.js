import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from 'react-file-base64';
import {useDispatch} from "react-redux";
import useStyles from './styles';
import {createPost, updatePost} from "../../store/actions/posts";
import { useSelector } from "react-redux";

const Form = ({currentId, setCurrentId}) => {
	const classes = useStyles();
	const [postData, setPostData] = useState({
		title: '', message: '', tags: '', selectedFile: ''
	});
	const dispatch = useDispatch();
	const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
	const user = JSON.parse(localStorage.getItem('profile'))
	
	useEffect(() => {
		if(post) setPostData(post);
	}, [post])
	
	
	const handleSubmit = (event) => {
		event.preventDefault();
		if (currentId) {
			dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
			setCurrentId(null);
		} else {
			dispatch(createPost({...postData, name: user?.result?.name}));
		}
		clearFormElements();
	};
	
	const clearFormElements = () => {
		setCurrentId(null);
		setPostData({
			title: '', message: '', tags: '', selectedFile: ''
		});
	};
	
	if(!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please Sign In to create your own memories and like other's memories.
				</Typography>
			</Paper>
		)
	}
	
	
	return (<Paper className={classes.paper} elevation={6}>
		<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
			<Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
			
			<TextField
				name="title"
				label="Title"
				variant="outlined"
				fullWidth
				value={postData.title}
				onChange={(event) => setPostData({...postData, title: event.target.value})}
			/>
			<TextField
				name="message"
				label="Message"
				variant="outlined"
				fullWidth
				value={postData.message}
				onChange={(event) => setPostData({...postData, message: event.target.value})}
			/>
			<TextField
				name="tags"
				label="Tags"
				variant="outlined"
				fullWidth
				value={postData.tags}
				onChange={(event) => setPostData({...postData, tags: event.target.value.split(',')})}
			/>
			<div className={classes.fileInput}>
				<FileBase
					type="file"
					multiple={false}
					onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
				/>
			</div>
			<Button className={classes.buttonSubmit} variant="contained" color={'primary'} size={'large'} type='submit'
					fullWidth>{currentId ? 'Update' : 'Submit'}</Button>
			<Button variant="contained" color={'secondary'} size={'small'} onClick={clearFormElements}
					fullWidth>Clear</Button>
		</form>
	</Paper>)
};

export default Form;