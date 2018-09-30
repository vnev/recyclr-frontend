import React from 'react'

export default class createListing extends React.Component {
    constructor() {
        super(props);
        this.state = {
            matType: '',
            matWeight: '',
        };
        this.typeHandler = this.typeHandler.bind(this);
        this.weightHandler = this.weightHandler.bind(this);
    }
    typeHandler(event) {
        this.setState({matType: event.target.value});
    }
    weightHandler(event) {
        this.setState({matWeight: event.target.value});
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form>
                            <div className="form-group">
                                <label for="matTypeIn">Material Type</label>
                                <input type="text" className="form-control" id="matTypeIn" value={this.state.matType} onChange={this.typeHandler}/>
                            </div>
                            <div className="form-group">
                                <label for="matWrightIn">Material Weight</label>
                                <input type="text" className="form-control" id="matWeightIn" value={this.state.matWeight} onChange={this.wieghtHandler}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}