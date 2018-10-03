import React from 'react'
import Axios from 'axios';
import urls from './Urls.js';

export default class createListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            matType: '',
            matWeight: 0.0,

        };
        this.titleHandler = this.titleHandler.bind(this);
        this.descHandler = this.descHandler.bind(this);
        this.typeHandler = this.typeHandler.bind(this);
        this.weightHandler = this.weightHandler.bind(this);
        this.createNewListing = this.createNewListing.bind(this);
    }
    titleHandler(event) {
        this.setState({
            title: event.target.value
        });
    }
    descHandler(event) {
        this.setState({
            description: event.target.value
        });
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
            title: this.state.title,
            description: this.state.description,
            material_type: this.state.matType,
            material_weight: this.state.matWeight,
            user_id: 1,
            img_hash: '',
        }
        Axios.post(`${urls.remote}/listing`, newObj).then(function(result) {
            console.log(result);
        });
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="titleIn">Material Type</label>
                                <input type="text" className="form-control" id="titleIn" value={this.state.title} onChange={this.titleHandler}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="descIn">Material Type</label>
                                <input type="text" className="form-control" id="descIn" value={this.state.description} onChange={this.descHandler}/>
                            </div>
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