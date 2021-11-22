import { FC } from "react";
import { Link, useParams } from "react-router-dom"
type props = {
    poster_path: string;
    title: string;
    vote_average: number;
    id: number
};

const MovieCard: FC<props> = ({ poster_path, title, vote_average, id }) => {

    const handleSashe = (vote_avg: number) => {
        const avg = (vote_avg / 10) * 100;

        if (avg === 0) return "grey";

        if (avg < 50) return "red";

        if (avg >= 50 && avg < 70) return "yellow";

        if (avg >= 70) return "green";
    };

    return (
        <Link to={`/movies/${id}`} className="movie-card">
            <div className="bar" style={{ background: handleSashe(vote_average) }}>
                {Number((vote_average / 10) * 100).toFixed(0)}
            </div>
            <div className="img">
                <img
                    src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt={title}
                />
            </div>
            <h2>{title}</h2>
        </Link>
    );
};

export default MovieCard;
