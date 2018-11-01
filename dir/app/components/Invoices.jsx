import React from 'react';
import InvoiceItem from './InvoiceItem.jsx';
import Axios from 'axios';
import api from './api.js';

//Needs to be reworked so the passed values are 

export default class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoicesId:[],
            userInvoices:[],
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
        api.get(`/invoice/` + window.localStorage.getItem('userid')).then(function(result) {
            console.log(result.data);
            _this.setState({
                invoicesId : result.data,
            });
            
        }).catch(function(error) {
            console.log(error);
        });
        /*
        while(i < _this.state.invoicesId.length) {
            api.get(`/invoice/` + _this.state.invoicesId[i]).then(function(result) {
                userInvoices = result.data;
                console.log(result.data);
            }).catch(function(error) {
                console.log(error);
            }) 
            i++;
        }*/
    }

    render() {
        console.log("memes");
        //this.getInvoices();
        return(
            <div className="container">
                <h1>Transaction History</h1>
                <div className="card">
                    {this.state.invoicesId.map((item,key) => {
                        return <InvoiceItem Item={item}/>
                    })}

                </div>

            </div>
        );
    }
}