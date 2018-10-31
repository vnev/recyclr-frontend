import React from 'react'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className='card'>
                        <div className='card-header text-center'>
                            <h1>Welcome to Recyclr</h1>
                        </div>
                        <div className='card-body'>
                            <h3>Recyclr is a new platform which allows users to 
                                list recyclable materials that they wish to recycle, and
                                allows for recycling companies to get in direct contact to 
                                such users.
                            </h3>
                            <h3>For a low set fee, which varies by material type, users can
                                list their recyclable materials. Interested recycling companies
                                can contact users and arrange for pickups.
                            </h3>
                            <h2>Interested?</h2>
                            <h2><a href="/auth">Log In/Sign Up</a> for Recyclr and start helping the planet!</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 