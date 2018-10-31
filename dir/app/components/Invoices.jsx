import React from 'react';
import InvoiceItem from './InvoiceItem.jsx';

//Needs to be reworked so the passed values are 

export default class Invoice extends React.Component {
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
                <h1>Trasaction History</h1>
                <div className="card">
                    {this.state.fakeData.map((item,key) => {
                        return <InvoiceItem Item={item}/>
                    })}

                </div>

            </div>
        );
    }
}