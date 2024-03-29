import React from 'react'
import ListingItem from './listingItem.jsx'
import api from './api.js'

/*This component loads a list of all chat rooms existing for each listing being discussed*/
export default class ChatSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: [],
        }

    }
    componentDidMount() {
        if (window.localStorage.getItem('userid') === null) {
            history.push('/auth');
        }
        //get all listings that a user has frozen
        let obj = {
            is_company: window.localStorage.getItem('is_company') == 'false' ? false : true,
        }
        let _this = this;
        api.post(`/listing/frozen/${window.localStorage.getItem('userid')}`, obj)
            .then(function (result) {
                _this.setState({
                    chatList: result.data,
                })
            });
    }
    render() {
        let disp = <h2>You have no messages</h2>

        if (this.state.chatList !== null) {
            disp = this.state.chatList.map((item, key) => {
                return <ListingItem key={key} Item={item} ButBool={false} />
            })

        }
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title text-center">Messages</h1>
                        {disp}
                    </div>
                </div>
            </div>
        );
    }
}
