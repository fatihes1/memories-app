import React, { useState } from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles'
import {useHistory} from "react-router-dom";

import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../store/actions/posts";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

const Post = ({post, setCurrentId}) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
	const history = useHistory();
	const [likes, setLikes] = useState(post?.likes);
	
	
	
	const deletePostHandler = () => {
		dispatch(deletePost(post._id));
	};
	
	const openPostHandler = () => {
		history.push(`/posts/${post._id}`);
	}
	
	const userId = user?.result?.googleId || user?.result?._id;
	const hasLikedPost = post.likes.find((like) => like === (userId));
	const clickLikeHandler = async () => {
		dispatch(likePost(post._id))
		if(hasLikedPost) {
			setLikes(post.likes.filter((id) => id !== (userId)))
		} else {
			setLikes([...post.likes, userId])
		}
	}
	const Likes = () => {
		if (likes.length > 0) {
			return likes.find((like) => like === userId)
				? (
					<><ThumbUpAltIcon
						fontSize="small"/>&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
				) : (
					<><ThumbUpAltOutlined
						fontSize="small"/>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
				);
		}
		
		return <><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>;
	};
	
	return (
		<Card className={classes.card} raised elevation={6}>
			<div onClick={openPostHandler} className={classes.cardBody}>
				<CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
				<div className={classes.overlay}>
					<Typography variant={'h6'}>{post.name}</Typography>
					<Typography variant={'body2'}>{moment(post.createdAt).fromNow()}</Typography>
				</div>
				
				<div className={classes.details}>
					<Typography variant={'body2'} color={'textSecondary'}>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
				</div>
				<Typography className={classes.title} variant={'h5'} gutterBottom>{post.title}</Typography>
				<CardContent>
					<Typography className={classes.message} variant={'body2'} color={'textSecondary'} component={'p'}
								gutterBottom>{post.message}</Typography>
				</CardContent>
			</div>
			<CardActions className={classes.cardActions}>
				{
					(user?.result.googleId === post?.creator || user?.result?._id === post?.creator) && (
						<div className={classes.overlay2}>
							<Button style={{color: 'white'}} size={'small'} onClick={() => setCurrentId(post._id)}>
								<MoreHorizIcon fontSize={'medium'}/>
							</Button>
						</div>
					
					)
				}
				<Button size={'small'} color={'primary'} onClick={clickLikeHandler}
						disabled={!user?.result}>
					<Likes/>
				</Button>
				{(user?.result.googleId === post?.creator || user?.result?._id === post?.creator) && (
					<Button size={'small'} color={'primary'} onClick={deletePostHandler}>
						<DeleteIcon fontSize={'small'}/>
						&nbsp;
						Delete
					</Button>
				)}
			</CardActions>
		
		
		</Card>
	)
};

export default Post;