import React from "react";
import { Pagination } from "@material-ui/lab";

function PaginationComp({ moviesPerPage, totalMovies, paginate, currentPage }) {
	const pageNumber = [];

	for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
		pageNumber.push(i);
	}

	return (
		<Pagination
			count={pageNumber.length}
			onChange={paginate}
			variant="outlined"
			shape="rounded"
			page={currentPage}
		/>
	);
}

export default PaginationComp;
