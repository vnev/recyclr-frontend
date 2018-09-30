import React from 'react'
import listItem from './listingItem.jsx'

export default class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    componentDidMount() {
        //make get request using stored email/username

        //set list = returned json objects list = results.data
    }
    render() {
        return(
            <div className="container">
                <div className="card">
                    {this.state.list.map((item,index) => {
                        //add props (matType, matWeight, userId)
                        <listItem></listItem>
                    })}
                </div>
            </div>
        );
    }


}