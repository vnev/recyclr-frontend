import React from 'react'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className='card'>
                        <div className='card-body'>
                            <h1 className="card-title text-center">Welcome to Recyclr</h1>
                            <h5>Recyclr is a new platform which allows users to
                                list recyclable materials that they wish to recycle, and
                                allows for recycling companies to get in direct contact to
                                such users.
                            </h5>
                            <h5>For a low set fee, which varies by material type, users can
                                list their recyclable materials. Interested recycling companies
                                can contact users and arrange for pickups.
                            </h5>
                            <hr></hr>
                            <div className="text-center">
                                <h3>Interested?</h3>
                                <h5><a href="/auth" className="rootLink">Log In/Sign Up</a> for Recyclr and start helping the planet!</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 