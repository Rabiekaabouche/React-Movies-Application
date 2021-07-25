import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	Grid,
	AppBar,
	CircularProgress,
	Container,
	InputLabel,
	MenuItem,
	FormHelperText,
	FormControl,
	Select,
	Typography,
	Grow,
	makeStyles,
} from "@material-ui/core";
import Movie from "./components/Movie";
import { getMovies, filterMovies } from "./actions/movies";
import Pagination from "./components/Pagination";

const useStyles = makeStyles({
	container: {},
	appBar: {
		backgroundColor: "transparent",
		borderRadius: 15,
		margin: "30px 0",

		justifyContent: "center",
		alignItems: "center",
	},
	heading: {
		color: "rgba(0,183,255, 1)",
		fontWeight: 500,
	},
	filterContainer: {
		justifyContent: "center",
	},
	filterItem: {
		margin: "20px 20px 40px 20px",
	},
	pagination: {
		margin: "5rem 0 2rem 0",
		display: "flex",
		justifyContent: "center",
		marginTop: "calc(10vh + 63px)",
		marginBottom: "2rem",
	},
});

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMovies());
	}, [dispatch]);

	const movies = useSelector((state) => state.movies);
	const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage, setMoviesPerPage] = useState(4);
	const [categoryValue, setCategoryValue] = useState("");
	const [likedBands, updateLikedBands] = useState([]);

	//Get current movies
	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = movies.filteredData.slice(
		indexOfFirstMovie,
		indexOfLastMovie
	);

	const paginate = (e, value) => {
		setCurrentPage(value);
	};

	const classes = useStyles();
	return (
		<Container>
			<AppBar position="static" color="inherit" className={classes.appBar}>
				<Typography variant="h3" align="center" className={classes.heading}>
					<span style={{ color: "black" }}>React</span> Movies
				</Typography>
			</AppBar>
			{movies.loading ? (
				<CircularProgress />
			) : (
				<>
					<Grid container className={classes.filterContainer}>
						<Grid item className={classes.filterItem}>
							<FormControl>
								<InputLabel id="demo-simple-select-helper-label">
									Page
								</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									autoWidth
									value={moviesPerPage}
									onChange={(e) => {
										setMoviesPerPage(e.target.value);
										setCurrentPage(1);
									}}
								>
									<MenuItem value={4}>4</MenuItem>
									<MenuItem value={8}>8</MenuItem>
									<MenuItem value={12}>12</MenuItem>
								</Select>
								<FormHelperText>
									Select number of movies Per page
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item className={classes.filterItem}>
							<FormControl>
								<InputLabel id="demo-simple-select-helper-label">
									Category
								</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									autoWidth
									value={categoryValue}
									onChange={(e) => {
										setCategoryValue(e.target.value);
										setCurrentPage(1);
										dispatch(filterMovies(e.target.value));
									}}
								>
									<MenuItem value="all">all</MenuItem>
									{movies.categories.map((category) => (
										<MenuItem key={category} value={category}>
											{category}
										</MenuItem>
									))}
								</Select>
								<FormHelperText>
									Choose category to filter movies
								</FormHelperText>
							</FormControl>
						</Grid>
					</Grid>
					{!movies.filteredData.length ? (
						<Typography align="center" variant="h4">
							No Movie found
						</Typography>
					) : (
						<Grow in>
							<Grid container alignItems="stretch" spacing={2}>
								{currentMovies.map((movie) => (
									<Grid key={movie.data.id} item sm={6} md={4} xs={12}>
										<Movie
											movie={movie.data}
											setCurrentPage={setCurrentPage}
											updateLikedBands={updateLikedBands}
											likedBands={likedBands}
											liked={movie.details}
										/>
									</Grid>
								))}
							</Grid>
						</Grow>
					)}
				</>
			)}
			<div className={classes.pagination}>
				<Pagination
					moviesPerPage={moviesPerPage}
					totalMovies={movies.filteredData.length}
					paginate={paginate}
					currentPage={currentPage}
				/>
			</div>
		</Container>
	);
}

export default App;
