import '../assets/css/Loader.css'

const Loader: React.FC = () => {
    return (
        <div className="container">
            <div className="loader"></div>
            <p className="loading">Loading </p> 
            <p className="mess"> Please wait</p>
        </div>
    );
}

export default Loader;