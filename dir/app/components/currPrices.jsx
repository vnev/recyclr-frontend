import React from 'react'
import axios from 'axios'

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
        .then(function(result) {
            console.log(result);
            _this.setState({
                textilePrice: (parseFloat(result.data.dataset.data[0][1])/100).toFixed(2),
            });
        });
        //copper
        axios.get('http://www.quandl.com/api/v3/datasets/ODA/PCOPP_USD.json?rows=1&api_key=ys7nkx9UoefECmStXx8G')
        .then(function(result) {
            console.log(result);
            _this.setState({
                copperPrice: (parseFloat(result.data.dataset.data[0][1])/2204.62).toFixed(2),
            });
        });
        //rubber
        axios.get('http://www.quandl.com/api/v3/datasets/ODA/PRUBB_USD.json?rows=1&api_key=ys7nkx9UoefECmStXx8G')
        .then(function(result) {
            console.log(result);
            _this.setState({
                rubberPrice: (parseFloat(result.data.dataset.data[0][1])/100).toFixed(2),
            });
        });
        //steel
        axios.get('http://www.quandl.com/api/v3/datasets/ODA/PTIN_USD.json?rows=1&api_key=ys7nkx9UoefECmStXx8G')
        .then(function(result) {
            console.log(result);
            _this.setState({
                steelPrice: (parseFloat(result.data.dataset.data[0][1])/2204.62).toFixed(2),
            });
        });
        //aluminum
        axios.get('http://www.quandl.com/api/v3/datasets/ODA/PALUM_USD.json?rows=1&api_key=ys7nkx9UoefECmStXx8G')
        .then(function(result) {
            console.log(result);
            _this.setState({
                aluminumPrice: (parseFloat(result.data.dataset.data[0][1])/2204.62).toFixed(2),
            });
        });
    }
    render() {
        return(
            <div id="card" className="card">
                <h2>Current material Prices</h2>
                <p>Copper: ${this.state.copperPrice} USD per Pound</p>
                <p>Tin: ${this.state.steelPrice} USD per Pound</p>
                <p>Aluminum: ${this.state.aluminumPrice} USD per Pound</p>
                <p>Textiles: ¢{this.state.textilePrice} USD per Pound</p>
                <p>Rubber: ¢{this.state.rubberPrice} USD per Pound</p>
            </div>
        );
    }
}