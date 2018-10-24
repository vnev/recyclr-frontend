import React from 'react';
import ReactDOM from 'react-dom'
import history from './history.js';

export default class ListingItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: '',
        }
    }
    componentDidMount() {
       /* var origin = `New York, NY`;
            var destination = `Los Angeles, CA`;
            var service = new google.maps.DistanceMatrixService();
                service.getDistanceMatrix({
                    origins: [origin],
                    destinations: [destination],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.IMPERIAL,
                    avoidHighways: false,
                    avoidTolls: false
                }, (response, status) => {
                    var distance = response.rows[0].elements[0].distance;
                    var distance_value = distance.value;
                    var distance_text = distance.text;
                    var miles = distance_text.substring(0, distance_text.length - 3);
                    console.log(`Length in miles: ${miles}`);
                   if (miles <= this.props.Dist || this.props.Dist === '26') {
                       this.setState({
                           distance: miles
                       });
                   }
                   else {
                    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
                   }
                });*/
    }
    render() {

        return(
            <div className="card listingRow">
                <div className="row ">
                    <div className="col-3">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/51ZLGkYM7PL.jpg" height="100" width="100"/>
                    </div>
                    <div className="col-3">
                        <h2>{this.props.Item.title}</h2>
                        <h3>{this.props.Item.description}</h3>
                        <h3>Zip Code: {this.props.Item.zipcode}</h3>
                    </div>
                    <div className="col-3">
                        <h2>Weight: {this.props.Item.material_weight} lbs</h2>
                        <h3>Type: {this.props.Item.material_type}</h3>
                        
                    </div>
                    <div className="col-3 text-right">
                        <p>{this.props.Item.userId}</p>
                        <button className="btn btn-primary">Freeze listing</button>
                        <button className="btn btn-secondary" onClick={() => { history.push('/choose_date/' + this.props.Item.listing_id) }}>Select Pickup date</button>
                        <button className="btn btn-primary" onClick={()=> {history.push('/payment')} }>Payment</button>
                    </div>
                </div>
            </div>

        );
    }
}
