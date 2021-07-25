const initialState = {
	data: [],
	filteredData: [],
	categories: [],
	loading: false,
};
const movies = (movies = initialState, action) => {
	switch (action.type) {
		case "LOADING_DATA":
			return { ...movies, loading: true };
		case "GET_ALL":
			const categorySet = [
				...new Set(action.payload.map((movie) => movie.category.toLowerCase())),
			];
			const detailedMovies = action.payload.map((movie) => {
				return {
					data: movie,
					details: {
						isLiked: false,
						likes: movie.likes,
						dislikes: movie.dislikes,
					},
				};
			});
			return {
				...movies,
				data: detailedMovies,
				filteredData: detailedMovies, // action.payload
				categories: categorySet,
				loading: false,
			};

		case "DELETE":
			const finalMovies = movies.data.filter(
				(movie) => movie.data.id !== action.payload
			);
			const lastCategory = [
				...new Set(
					finalMovies.map((movie) => movie.data.category.toLowerCase())
				),
			];

			return {
				data: finalMovies,
				filteredData: finalMovies,
				categories: lastCategory,
			};

		case "FILTER":
			const filtered = movies.data.filter(
				(movie) => movie.data.category.toLowerCase() === action.payload
			);
			if (action.payload === "all")
				return { ...movies, filteredData: movies.data };
			return { ...movies, filteredData: filtered };

		default:
			return movies;
	}
};

export default movies;
