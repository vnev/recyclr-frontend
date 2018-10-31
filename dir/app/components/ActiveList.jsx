import React from 'react';
import PendItem from './PendItem.jsx';

export default class PendingTrans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fakeData: [
                {"price" : "$100", "transDate" : "3/14/1997", "company" : "Bob's stuff"},
                {"price" : "$200", "transDate" : "3/14/1998", "company" : "Jon's Stuff"}
            ],
        }
    }

    render() {
        return(
            <div className="container">
                <h1>Pending Transactions</h1>
                <div className="card">
                {this.state.fakeData.map((item,key) => {
                        return <PendItem Item={item}/>
                    })}
                </div>

            </div>
        );
    }
}