import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <>
            <h2>What happened here??</h2>
            <p className="marginBottom">Looks like this path doesn't exist on the site!</p>
            <Link to="/"><span className='homeLink'>Back to Home</span></Link>
        </>
    )
} 

export default ErrorPage;