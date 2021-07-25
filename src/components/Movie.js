import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
	makeStyles,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Button,
	Typography,
} from "@material-ui/core";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { deleteMovie } from "../actions/movies";

const useStyles = makeStyles({
	iconWrapper: {
		display: "flex",
		alignItems: "center",
		fontSize: "16px",
		userSelect: "none",
	},
	iconsContainer: {
		flexBasis: "50%",
		display: "flex",
	},
	marginIcon: {
		marginLeft: "20px!important",
	},
	icon: {
		marginRight: "2px",
	},
	buttonWrapper: {
		display: "flex",
	},
	cardAction: {
		margin: 12,
		justifyContent: "space-between",
	},
	header: {
		fontWeight: 700,
		fontSize: "2rem",
	},
});

function Movie({ movie, setCurrentPage, liked }) {
	const dispatch = useDispatch();

	const [state, updateState] = useState(false);

	const handleLikess = () => {
		if (!liked.isLiked) {
			movie.likes++;
			if (movie.dislikes > liked.dislikes) {
				movie.dislikes--;
			}
			liked.isLiked = true;
			updateState((prev) => !prev);
		} else {
			movie.dislikes++;
			movie.likes--;
			liked.isLiked = false;
			updateState((prev) => !prev);
		}
	};

	const classes = useStyles();

	return (
		<Card variant="outlined">
			<CardActionArea>
				<CardContent>
					<Typography
						variant="h4"
						component="h2"
						gutterBottom
						align="center"
						className={classes.header}
					>
						{movie.title}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{`Category: ${movie.category}`}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.cardAction}>
				<div className={classes.iconsContainer}>
					<div className={classes.iconWrapper}>
						<ThumbUpIcon
							className={classes.icon}
							fontSize="medium"
							style={{
								color: movie.likes > liked.likes > 0 ? "#0ba6ff" : "#909090",
							}}
						/>
						{movie.likes}
					</div>
					<div className={`${classes.iconWrapper} ${classes.marginIcon}`}>
						<ThumbDownIcon
							className={classes.icon}
							fontSize="medium"
							style={{
								color: movie.dislikes > liked.dislikes ? "#0ba6ff" : "#909090",
							}}
						/>
						{movie.dislikes}
					</div>
				</div>
				<div className={classes.buttonWrapper}>
					<Button size="small" color="primary" onClick={handleLikess}>
						{!liked.isLiked ? "Like" : "Dislike"}
					</Button>
					<Button
						size="small"
						color="secondary"
						onClick={() => {
							dispatch(deleteMovie(movie.id));
							setCurrentPage(1);
						}}
					>
						Delete
					</Button>
				</div>
			</CardActions>
		</Card>
	);
}

export default Movie;
