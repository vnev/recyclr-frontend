import React from 'react';

export default class listItem extends React.Component {
    constructor(props) {
        super(props);
        this.state= {

        }
    }
    render() {
        return(
            <div className="card listingRow">
                <div className="row ">
                    <div className="col-4">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/51ZLGkYM7PL.jpg" height="100" width="100"/>
                    </div>
                    <div className="col-4">
                        <h2>Lots of scrap</h2>
                        <h3>There is a bunch of metal</h3>
                    </div>
                    <div className="col-4 text-right">
                        <p>User1</p>
                        <button className="btn btn-primary">Freeze listing</button>
                        <button className="btn btn-secondary">Select Pickup date</button>
                    </div>
                </div>
            </div>

        );
    }
}
