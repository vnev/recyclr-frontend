import React from 'react'

/*Home page of Recyclr, explains our app's goal and features*/
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="classN" className="container-fluid">
                <div className="row">
                    <div className='card'>
                        <div className='card-body'>
                            <h1 className="card-title text-center">Welcome to Recyclr</h1>
                            <h5 className="text-success"> <b>Why is recycling important?</b> </h5>

                            <h5>Recycling is important in today’s world if we want to leave this planet for our future generations. <br></br>
                                <b>It saves energy</b> - Using recycled materials in the manufacturing process uses less energy than producing new products from raw materials. <br></br>
                                <b>It conserves resources</b> - By recycling we reducing the need to consume new natural resources. <br></br>
                                <b>It reduces landfill</b> - Recyclable materials are reprocessed into new products instead of being sent to the landfill. <br></br>
                            </h5>

                            <h5 className="text-success"> <b>What is Recyclr?</b> </h5>

                            <h5>Recyclr is a new platform which allows users to
                                list recyclable materials that they wish to recycle, and
                                allows for recycling companies to get in direct contact to
                                such users.
                            </h5>

                            <h5 className="text-success"> <b>How does Recyclr work?</b> </h5>
                            <h5>For a low set fee, which varies by material type, users can
                                list their recyclable materials. Interested recycling companies
                                can contact users and arrange for pickups.
                            </h5>
                            <hr></hr>
                            <div className="text-center">
                                <h3>Interested?</h3>
                                <h5><a href="/auth" className="rootLink">Log In/Sign Up</a> for Recyclr and start helping the planet!</h5>
                            </div>
                            <hr></hr>
                            <div className="text-center">
                                <h5>Learn more about <a href="/mission" className="rootLink">our mission</a>.</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
