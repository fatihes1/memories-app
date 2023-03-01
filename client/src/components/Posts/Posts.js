import React from 'react';
import Post from "./Post/Post";

const Posts = (props) => {
	return (
		<React.Fragment>
			<h1>Post</h1>
			<Post/>
			<Post/>
		</React.Fragment>
	)
};

export default Posts;