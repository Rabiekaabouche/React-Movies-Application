import { movies$ } from "../data/movies";

export const getMovies = () => async (dispatch) => {
	dispatch({ type: "LOADING_DATA" });
	const movies = await movies$;
	try {
		dispatch({ type: "GET_ALL", payload: movies });
	} catch (error) {
		console.log(error);
	}
};

export const deleteMovie = (id) => {
	return {
		type: "DELETE",
		payload: id,
	};
};

export const filterMovies = (selected) => {
	return {
		type: "FILTER",
		payload: selected,
	};
};
