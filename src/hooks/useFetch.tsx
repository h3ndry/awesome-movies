import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url: string) {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(url)
            .then((response) => {
                setData((prev: any)=> {
                if (!prev) return response.data.results
                return [...prev, ...response.data.results]
                })
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
}

export default useFetch;
