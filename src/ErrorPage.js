import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <>
            <h2>What happened here??</h2>
            <p>Looks like this path doesn't exist on the site!</p>
            <Link to="/">Back to Home</Link>
        </>
    )
} 

export default ErrorPage;