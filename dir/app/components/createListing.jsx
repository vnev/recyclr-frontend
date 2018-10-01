import React from 'react'
import Axios from 'axios';

export default class createListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matType: '',
            matWeight: '',
        };
        this.typeHandler = this.typeHandler.bind(this);
        this.weightHandler = this.weightHandler.bind(this);
        this.createNewListing = this.createNewListing.bind(this);
    }
    typeHandler(event) {
        this.setState({
            matType: event.target.value
        });
    }
    weightHandler(event) {
        this.setState({
            matWeight: event.target.value
        });
    }
    createNewListing() {
        let newObj = {
            material_type: this.state.matType,
            materal_weight: this.state.matWeight,
            user_id: '1',
        }
        Axios.post("http://localhost:8080/listing", newObj).then(function(result) {
            console.log(result);
        });
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        
                            <div className="form-group">
                                <label htmlFor="matTypeIn">Material Type</label>
                                <input type="text" className="form-control" id="matTypeIn" value={this.state.matType} onChange={this.typeHandler}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="matWeightIn">Material Weight</label>
                                <input type="text" className="form-control" id="matWeightIn" value={this.state.matWeight} onChange={this.weightHandler}/>
                            </div>
                        
                        <button className="btn btn-primary" onClick={this.createNewListing}> Create New Listing</button>
                    </div>
                </div>
            </div>
        );
    }
}