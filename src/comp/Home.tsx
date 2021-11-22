import { Link } from 'react-router-dom'

function Home() {
  return (
   <div className="home">

   <h1>Welcome to Awesome Movies</h1>

   <Link to="/movies">Browse movies</Link>

   </div>
  );
}

export default Home;
