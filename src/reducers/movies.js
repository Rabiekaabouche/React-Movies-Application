const initialState = {
	data: [],
	filteredData: [],
	categories: [],
	loading: false,
	actualCategory: "all",
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
			
			const category = movies.actualCategory === "all" ? "all": movies.data
				.find((movie) => movie.data.id === action.payload)
				.data.category.toLowerCase();

			console.log("category", category);

			const finalMovies = movies.data.filter(
				(movie) => movie.data.id !== action.payload
			);

			let filteredData;

			let moviesSameCategory = finalMovies.filter(
				(movie) => movie.data.category.toLowerCase() === category
			);
			console.log("moviesSameCategory", moviesSameCategory);
			filteredData = moviesSameCategory.length
				? moviesSameCategory
				: finalMovies;
			const actualCategory = !moviesSameCategory.length ? "all" : category;
			console.log("actualCategory", actualCategory);

			const lastCategory = [
				...new Set(
					finalMovies.map((movie) => movie.data.category.toLowerCase())
				),
			];

			return {
				data: finalMovies,
				filteredData: filteredData,
				categories: lastCategory,
				actualCategory: actualCategory,
			};

		case "FILTER":
			const filtered = movies.data.filter(
				(movie) => movie.data.category.toLowerCase() === action.payload
			);
			if (action.payload === "all")
				return { ...movies, filteredData: movies.data, actualCategory: action.payload };
			return {
				...movies,
				filteredData: filtered,
				actualCategory: action.payload,
			};

		default:
			return movies;
	}
};

export default movies;
