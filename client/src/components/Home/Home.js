import {Container, Grid, Grow, Paper, AppBar, TextField, Button} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import {getPosts, getPostsBySearch} from "../../store/actions/posts";
import Pagination from "../Pagination/Pagination";
import useStyles from "./styles";

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(null);
	const query = useQuery();
	const history = useHistory();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);
	
	useEffect(() => {
		dispatch(getPosts());
	},[currentId,dispatch]);
	
	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};
	
	const searchPost = () => {
		if(search.trim()) {
			dispatch(getPostsBySearch({search, tags: tags.join(',')}));
			// history.push(`/posts/search?searchQuery=${search || 'none'}`);
		} else {
			history.push('/');
		}
	};
	
	
	const handleAddTags = (tag) => {
		setTags([...tags, tag]);
	};
	const handleDeleteTags = (tagToDelete) => {
		setTags(tags.filter((tag) => tag !== tagToDelete));
	};
	
	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid container justifyContent={'space-between'} alignItems={'stretch'} spacing={3} className={classes.gridContainer}>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<TextField
								name="search"
								variant="outlined"
								label="Search Memories"
								onKeyPress={handleKeyPress}
								fullWidth
								value={search}
								onChange={(event) => setSearch(event.target.value) }
							/>
							<ChipInput
								style={{ margin: '10px 0' }}
								value={tags}
								onAdd={handleAddTags}
								onDelete={handleDeleteTags}
								label="Search Tags"
								variant="outlined"
								newChipKeyCodes={[13, 32, 188]}
							/>
							<Button onClick={searchPost} className={classes.searchButton} color="primary" variant={"contained"}>
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						<Paper  elevation={6}>
							<Pagination />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	)
};

export default Home;