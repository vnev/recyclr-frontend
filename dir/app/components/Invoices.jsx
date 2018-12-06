import React from 'react';
import InvoiceItem from './InvoiceItem.jsx';
import Axios from 'axios';
import api from './api.js';
import toastr from 'toastr';

//Needs to be reworked so the passed values are

/*Fetches all previous invoices of a user, or indicates there have been none so far*/
export default class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoicesId: [],
            userInvoices: [],
        }
        // let invoicesId = [];
        //this.getInvoices = this.getInvoices.bind(this);
    }

    componentDidMount() {
        let _this = this;
        let i;
        //let invoicesId = [];
        let userInvoices = [];
        console.log(window.localStorage.getItem('userid'));
        api.get(`/invoice/` + window.localStorage.getItem('userid')).then(function (result) {
            console.log(result.data);
            _this.setState({
                invoicesId: result.data,
            });
            toastr.options.closeButton = true;
            toastr.success("Got all invoices", "Success");
        }).catch(function (error) {
            console.log(error);
            toastr.options.closeButton = true;
            toastr.error("Error fetching invoices. Please try again", "Error");
        });
    }

    render() {
        //this.getInvoices();
        let invoices;
        if (!this.state.invoicesId) {
            invoices = <h5 className="text-center">No invoices to show...</h5>
        } else {
            invoices =
                this.state.invoicesId.map((item, key) => {
                    return <InvoiceItem Item={item} key={key} />
                })
        }
        return (
            <div id="containC" className="container">
                <div className="card" style={{ height: "100vh" }}>
                    <div className="card-body">
                        <h1 className="card-title text-center">Transaction History</h1>
                        {invoices}
                    </div>
                </div>

            </div>
        );
    }
}
