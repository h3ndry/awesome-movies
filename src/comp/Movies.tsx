import useFetch from "../hooks/useFetch";
import { useState, useEffect, useRef, useCallback } from "react";
import MovieCard from "../MovieCard";

function Movies() {


    // The Movie databse api accesss key: please see: https://www.themoviedb.org/documentation/api
    // Loaded from run time using enviroment variable env-cmd: https://www.npmjs.com/package/env-cmd 
    const api_key = process.env['REACT_APP_MOVIE_API_KEY']

    const [page, setPage] = useState<number>(1);
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`;
    const { data, loading, error } = useFetch(url);

    const element = useCallback((node: any) => {
        const btnObserver: any = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prev) => prev + 1);
            }
        });
        if (node) {
            btnObserver.observe(node);
        }
    }, []);

    if (loading && page === 1) return <h1>Loading...</h1>;

    if (error || !data) {
        console.log(error);
        return <p>The was an error</p>;
    }

    return (
        <>
            <div className="movie-list">
                {data.map((movie: any) => {
                    return <MovieCard key={movie.id} {...movie} />;
                })}
            </div>

            <div ref={element} className="load-more">
                Loading... more movies{" "}
            </div>
        </>
    );
}

export default Movies;
