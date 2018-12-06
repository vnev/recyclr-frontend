import React from 'react'
import axios from 'axios'

/*This component provides users with current US market prices for the common types of recyclable material*/
export default class CurrPrices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copperPrice: 0,
            textilePrice: 0,
            plasticPrice: 0,
            rubberPrice: 0,
            aluminumPrice: 0,
            steelPrice: 0,
        };

    }
    componentDidMount() {
        let _this = this;
        //textiles
        axios.get('http://www.quandl.com/api/v3/datasets/ODA/PCOTTIND_USD.json?rows=1&api_key=ys7nkx9UoefECmStXx8G')
            .then(function (result) {
                _this.setState({
                    textilePrice: (parseFloat(result.data.dataset.data[0][1]) / 100).toFixed(2),
                });
            });
        //copper
        axios.get('http://www.quandl.com/api/v3/datasets/ODA/PCOPP_USD.json?rows=1&api_key=ys7nkx9UoefECmStXx8G')
            .then(function (result) {
                _this.setState({
                    copperPrice: (parseFloat(result.data.dataset.data[0][1]) / 2204.62).toFixed(2),
                });
            });
        //rubber
        axios.get('http://www.quandl.com/api/v3/datasets/ODA/PRUBB_USD.json?rows=1&api_key=ys7nkx9UoefECmStXx8G')
            .then(function (result) {
                _this.setState({
                    rubberPrice: (parseFloat(result.data.dataset.data[0][1]) / 100).toFixed(2),
                });
            });
        //steel
        axios.get('http://www.quandl.com/api/v3/datasets/ODA/PTIN_USD.json?rows=1&api_key=ys7nkx9UoefECmStXx8G')
            .then(function (result) {
                _this.setState({
                    steelPrice: (parseFloat(result.data.dataset.data[0][1]) / 2204.62).toFixed(2),
                });
            });
        //aluminum
        axios.get('http://www.quandl.com/api/v3/datasets/ODA/PALUM_USD.json?rows=1&api_key=ys7nkx9UoefECmStXx8G')
            .then(function (result) {
                _this.setState({
                    aluminumPrice: (parseFloat(result.data.dataset.data[0][1]) / 2204.62).toFixed(2),
                });
            });
    }
    render() {
        return (
            <div id="card" className="container" style={{ marginTop: "20px" }}>
                <div className="col-md-6 offset-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h3 className="card-title">Current Material Prices</h3>
                            <p><b>Copper</b>: ${this.state.copperPrice} per Pound</p>
                            <p><b>Tin</b>: ${this.state.steelPrice} per Pound</p>
                            <p><b>Aluminum</b>: ${this.state.aluminumPrice} per Pound</p>
                            <p><b>Textiles</b>: ${this.state.textilePrice} per Pound</p>
                            <p><b>Rubber</b>: ${this.state.rubberPrice} per Pound</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
