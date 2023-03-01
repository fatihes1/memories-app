import React from 'react';
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
	const classes = useStyles();
	// state is the all state of the store
	const posts = useSelector((state) => state.posts);
	console.log(posts);
	return (
		!posts.length ? <CircularProgress /> : (
			<Grid className={classes.container} container alignItems="stretch" spacing={3}>
				{posts.map((post) => (
					<Grid key={post._id} xs={12} sm={6} item>
						<Post post={post} setCurrentId={setCurrentId} />
					</Grid>
				))}
			</Grid>
		)
	)
};

export default Posts;