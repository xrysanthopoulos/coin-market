import {useRef, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const {formatCurrency, numberToPercentage} = require('./helpers.js');

const ListItem = (data) => {
    const ref = useRef();

    const [showDetails, setShowDetails] = useState(false);

    let tranStyle = {};

    useEffect(() => {
        positionEl();
    }, []);

    const handleMouseEnter = () => {
        setShowDetails(true);
    };

    const handleMouseLeave = () => {
        setShowDetails(false);
    };

    function positionEl() {
        const element = document.getElementById(ref.current.id);
        const rect = element.getBoundingClientRect();
        if (rect.left.toFixed() > 500) {
            tranStyle = {position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-100%, 0%)`};
        } else {
            tranStyle = {position: `absolute`, top: `50%`, left: `50%`, transform: `translate(10%, 0%)`};
        }
    }

    return (
        <div className="col">
            <div className="list-item" id={data.id} ref={ref}
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}>
                <Link to={{pathname: `/coin/${data.id}`, state: {id: data.id}}}>
                    <img src={data.image} alt="Image coin"/>
                </Link>
                {showDetails && (
                    <div className="details border border-primary" onLoad={positionEl()} style={tranStyle}>
                        <h2>{data.name}</h2>
                        <div><span className="fw-bolder">Symbol:</span> <span
                            className="text-uppercase">{data.symbol}</span></div>
                        <div><span className="fw-bolder">Price:</span> {formatCurrency(data.current_price)}</div>
                        <div><span className="fw-bolder">High 24H:</span> {formatCurrency(data.high_24h)}</div>
                        <div><span className="fw-bolder">Low 24H:</span> {formatCurrency(data.low_24h)}</div>
                        <div><span className="fw-bolder">Change 24H:</span>
                            <span style={{color: data.price_change_percentage_24h > 0 ? 'green' : 'red'}}>
                            {numberToPercentage(data.price_change_percentage_24h)}
                        </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

function MarketsPage() {
    const url = '/api/coins/markets';

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({page: currentPage})
        };

        const response = await fetch(url, requestOptions);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
        window.scrollTo(0, 0)
    }, [currentPage]);

    const handlePaginationPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePaginationNext = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <h1 className="d-flex justify-content-center pb-5">Coins Market</h1>
            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {data && (
                <div className="container text-center">
                    <div className="row">
                        {data.map(item => (
                            <ListItem key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            )}
            <div className="d-flex justify-content-center">
                {!loading && (
                    <ul className="pagination">
                        <li className="page-item" onClick={handlePaginationPrevious}>
                            <button className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">{currentPage}</a></li>
                        <li className="page-item" onClick={handlePaginationNext}>
                            <button className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default MarketsPage;
