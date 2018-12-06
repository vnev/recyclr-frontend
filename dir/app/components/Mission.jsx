import React from 'react';

export default class Mission extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className='card'>
                        <div className='card-body'>
                            <div className="text-center">
                                <h1 className="card-title text-center">Our Mission</h1>
                                <img src='http://www.cantonga.gov/images/civica/New%20dept%20images/Recycle_Free_Download_PNG.png' alt="HTML5" style={{ width: "200px", height: "200px" }} ></img>
                                <br></br><br></br>
                                <h5 className="text-success"> <b>Our mission is to create a community of recyclers that are excited to improve how recycling works.</b> </h5>

                                <h5>Recycling is becoming increasingly more important in today’s world and we understand that. However, there are still many residential areas with ‘dead spots’ where recycling isn’t an option for many people. Recyclr is meant to be a solution to that problem and provide more options for people who want to recycle on their own schedule.
                                Recyclr aims to promote collaborative recycling within a community. People who have a lot of products to recycle are encouraged to hold on to it until they have a substantial amount of waste, which they can then put up as a listing on Recyclr, and interested recycling companies can coordinate a time to come pick it up. <br></br>

                                </h5>

                                <br></br>
                                <h5 className="text-success"> <b>Learn more about recycling</b> </h5>

                                <h5>"Recycling is important to preserve the environment and to leave the planet in a better condition than we found it. Did you know that the average American throws away four pounds of trash daily? That is more than 1.5 tons of waste per person per year. Multiply that by 6 billion people and you know we have a major problem with waste.

                                    For example, one of the biggest problems in the world today is the staggering amount of electronic waste (e-waste) that is produced. In 2009, thrown away TVs, computer, printers, monitors, scanners, keyboards etc. made up 2.37 million tons in the US.

                                    This was only 2% of our landfill trash, but 70% of our toxic waste. It poisons our soil, water, trees and other precious resources. E-waste is especially bad for the environment and is something that kids can help to prevent as they learn to recycle many things in their communities: papers, magazines, cans, plastic and glass bottles, electronics and more.

                                    The good news that all of us can do our part to recycle, and it starts the youth of America. If children learn from early on to recycle, they will carry that good habit with them for life. With some easy effort and guidelines, kids can learn how to become part of the solution to recycling for a healthier planet."

                                    <br></br><br></br>

                                    Recycling is how we take trash and transform it into new products. There are several types of recycling processes that allow some materials to be used one or more times. Recycling is good for us and the environment because it reduces the use of new raw materials to product new products. It also reduces the energy we use, improves the quality of air and water, and fights climate change.

                                    <br></br><br></br>

                                    All sorts of things can be recycled. Some of the most common processes used today recycle:

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Plastics</li>
                                        <li className="list-group-item">Glass</li>
                                        <li className="list-group-item">Metals</li>
                                        <li className="list-group-item">Electronics</li>
                                        <li className="list-group-item">Computers and accessories</li>
                                        <li className="list-group-item">Textiles</li>
                                        <li className="list-group-item">Newspapers and magazines</li>
                                        <li className="list-group-item">Cardboard</li>
                                        <li className="list-group-item">  </li>
                                    </ul>

                                    <a href="https://www.reusethisbag.com/articles/kids-guide-to-recycling/">Source to learn more.</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}