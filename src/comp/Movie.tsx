import useFetch from "../hooks/useFetch";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Movie() {
    // The Movie databse api accesss key: please see: https://www.themoviedb.org/documentation/api
    // Loaded from run time using enviroment variable env-cmd: https://www.npmjs.com/package/env-cmd
    const api_key = process.env["REACT_APP_MOVIE_API_KEY"];

    let { id } = useParams();
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`;
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                setError(err);
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSashe = (vote_avg: number) => {
        const avg = (vote_avg / 10) * 100;

        if (avg === 0) return "grey";

        if (avg < 50) return "red";

        if (avg >= 50 && avg < 70) return "yellow";

        if (avg >= 70) return "green";
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        const cardName = `Name: ${name} \n
                          Surname: ${surname} \n
                          Email: ${email} \n
                          Phone Number: ${phoneNumber} \n
                          Movie: ${data.title} ${
                    data.release_date.split("-")[0]
        }`;

        try {
            const body = {
                name: cardName,
                key: process.env["REACT_APP_TRELLO_API_KEY"],
                token: process.env["REACT_APP_TRELLO_APP_TOKEN"],
                idList: process.env["REACT_APP_LIST_ID"]
            };


            const res = await fetch('https://api.trello.com/1/cards/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            alert("The data is has been submited");
        } catch (e) {
            console.log(e);
            alert("something went went wrong");
        } finally {
            setName("");
            setSurname("");
            setPhoneNumber("");
            setEmail("");
        }
    };

    if (loading) return <h1>Loading...</h1>;

    if (error || !data) {
        console.log(error);
        return <p>The was an error</p>;
    }

    return (
        <>
            <div className="movie-page">
                <div className="img">
                    <img
                        src={`http://image.tmdb.org/t/p/w500/${data.poster_path}`}
                        alt=""
                    />
                </div>

                <div className="info">
                    <h3>
                        {data.title} ({data.release_date.split("-")[0]})
                    </h3>
                    <p>{data.tagline} </p>
                    <div
                        style={{ background: handleSashe(data.vote_average) }}
                        className="rating"
                    >
                        {Number((data.vote_average / 10) * 100).toFixed(0)}
                    </div>
                    <h3>Overview</h3>
                    <p>{data.overview}</p>
                    <h3>Genres</h3>
                    {data.genres.map((item: any) => (
                        <span key={item.id}>{item.name}</span>
                    ))}
                </div>

                <form onSubmit={handleFormSubmit} className="book-form">
                    <input
                        onChange={(e: any) => setName(e.target.value)}
                        value={name}
                        required
                        placeholder="First Name *"
                        type="text"
                    />
                    <input
                        onChange={(e: any) => setSurname(e.target.value)}
                        value={surname}
                        required
                        placeholder="Surname *"
                        type="text"
                    />
                    <input
                        onChange={(e: any) => setEmail(e.target.value)}
                        value={email}
                        required
                        placeholder="Email *"
                        type="email"
                    />
                    <input
                        value={phoneNumber}
                        onChange={(e: any) => setPhoneNumber(e.target.value)}
                        required
                        placeholder="Phone Number *"
                        type="number"
                    />
                    <input className="btn" type="submit" value="Get Movie" />
                </form>
            </div>
        </>
    );
}

export default Movie;
