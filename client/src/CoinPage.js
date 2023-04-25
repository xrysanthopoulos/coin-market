import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import parse from 'html-react-parser';
import {useParams} from 'react-router-dom';

const {formatCurrency, numberToPercentage} = require('./helpers.js');


function CoinPage() {
    const {id} = useParams();
    const url = '/api/coins/';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url + id)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error(error);
            });
    }, []);

    return (

        <div>
            <Link className="ps-3" to={{pathname: `/`}}>back to Market</Link>
            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <img width="60" src={data && data.image.large}/>
                        <h1 className="display-4">{data && data.name}</h1>
                    </div>
                    <p className="lead">Price: {data && formatCurrency(data.market_data.current_price.usd)}</p>
                    <table className="table jumbotron jumbotron-fluid">
                        <thead>
                        <tr>
                            <th scope="col">24H</th>
                            <th scope="col">7 days</th>
                            <th scope="col">14 days</th>
                            <th scope="col">1 month</th>
                            <th scope="col">2 months</th>
                            <th scope="col">200 days</th>
                            <th scope="col">1 year</th>
                            <th scope="col">Highest 24H</th>
                            <th scope="col">Lowest 24H</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{color: data?.market_data?.price_change_percentage_24h > 0 ? 'green' : 'red'}}>{data && numberToPercentage(data.market_data.price_change_percentage_24h)}</td>
                            <td style={{color: data?.market_data?.price_change_percentage_7d > 0 ? 'green' : 'red'}}>{data && numberToPercentage(data.market_data.price_change_percentage_7d)}</td>
                            <td style={{color: data?.market_data?.price_change_percentage_14d > 0 ? 'green' : 'red'}}>{data && numberToPercentage(data.market_data.price_change_percentage_14d)}</td>
                            <td style={{color: data?.market_data?.price_change_percentage_30d > 0 ? 'green' : 'red'}}>{data && numberToPercentage(data.market_data.price_change_percentage_30d)}</td>
                            <td style={{color: data?.market_data?.price_change_percentage_60d > 0 ? 'green' : 'red'}}>{data && numberToPercentage(data.market_data.price_change_percentage_60d)}</td>
                            <td style={{color: data?.market_data?.price_change_percentage_200d > 0 ? 'green' : 'red'}}>{data && numberToPercentage(data.market_data.price_change_percentage_200d)}</td>
                            <td style={{color: data?.market_data?.price_change_percentage_1y > 0 ? 'green' : 'red'}}>{data && numberToPercentage(data.market_data.price_change_percentage_1y)}</td>
                            <td>{data && formatCurrency(data.market_data.high_24h.usd)}</td>
                            <td>{data && formatCurrency(data.market_data.low_24h.usd)}</td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="lead">{data && parse(data?.description?.en)}</p>
                </div>
            </div>
        </div>
    );
}

export default CoinPage;