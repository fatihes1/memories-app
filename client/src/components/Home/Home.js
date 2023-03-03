import {Container, Grid, Grow} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getPosts} from "../../store/actions/posts";

const Home = () => {
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(null);
	
	useEffect(() => {
		dispatch(getPosts());
	},[currentId,dispatch]);
	return (
		<Grow in>
			<Container>
				<Grid container justifyContent={'space-between'} alignItems={'stretch'} spacing={3}>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	)
};

export default Home;