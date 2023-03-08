import React from 'react';
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
	const classes = useStyles();
	// state is the all state of the store
	const {posts, isLoading} = useSelector((state) => state.posts);
	// const posts = useSelector((state) => state.posts.posts);
	
	if(!posts.length && !isLoading) return 'No posts';
	
	return (
		isLoading ? <CircularProgress /> : (
			<Grid className={classes.container} container alignItems="stretch" spacing={3}>
				{posts.map((post) => (
					<Grid key={post._id} xs={12} sm={12} md={6} lg={3} item>
						<Post post={post} setCurrentId={setCurrentId} />
					</Grid>
				))}
			</Grid>
		)
	)
};

export default Posts;