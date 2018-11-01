import React from 'react'
import api from './api.js'
import history from './history.js'
import Autocomplete from 'react-google-autocomplete'

//uncomment file when database is updated

export default class createListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            matType: 'Plastic',
            matWeight: '',
            image: '',
            address: '',
            date: '',
            imagePreviewUrl: ''

        };
        this.titleHandler = this.titleHandler.bind(this);
        this.descHandler = this.descHandler.bind(this);
        this.typeHandler = this.typeHandler.bind(this);
        this.weightHandler = this.weightHandler.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
        this.dateHandler = this.dateHandler.bind(this);
        this.createNewListing = this.createNewListing.bind(this);

    }
    titleHandler(event) {
        this.setState({
            title: event.target.value
        });
    }
    componentDidMount() {
        if(window.localStorage.getItem('token') === null || window.localStorage.getItem('is_company') === 'true') {
            history.push('/auth');
        }
    }
    descHandler(event) {
        this.setState({
            description: event.target.value
        });
    }
    typeHandler(event) {
        this.setState({
            matType: event.target.value
        });

    }
    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    weightHandler(event) {
        if (this.isNumeric(event.target.value)) {
            this.setState({
                matWeight: event.target.value
            });
        }
    }
  imageHandler(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  dateHandler(event) {
    this.setState({
        date: event.target.value
    });
  }
    createNewListing(event) {
        let price;
        let _this = this;
        event.preventDefault();
        var form = new FormData();
        form.append('title', this.state.title);
        form.append('description', this.state.description);
        form.append('material_type', this.state.matType);
        form.append('material_weight', parseFloat(this.state.matWeight));
        form.append('address', this.state.address);
        form.append('image', this.state.image);
        form.append('pickup_date_time', this.state.date);
        form.append('user_id', parseInt(window.localStorage.getItem('userid')));
        api.post(`/listing`, form)
        .then(function(result) {
            window.localStorage.setItem('currID', result.data.listing_id);
            switch(_this.state.matType) {
                case "Plastic":
                    price = 1.5;
                case "Electronics":
                    price = 1.7;
                case "Rubber":
                    price = 1.9;
                case "Textile":
                    price = 2;
                default:
                    price = 2.3;
            }
            window.localStorage.setItem('price', price);
            console.log(window.localStorage.getItem('currID'));
            history.push('/payment');
        }).catch(function(error) {
            console.log(error);
        });
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form>
                            <div className="form-group">
                            <label htmlFor="fileIn">Upload a Picture of Materials</label>
                                <input className="fileInput form-control-file"
                                    id="fileIn"
                                  type="file"
                                  onChange={(e)=>this.imageHandler(e)} />

                            </div>
                            <div className="form-group">
                                <label htmlFor="titleIn">Title</label>
                                <input type="text" className="form-control" id="titleIn" value={this.state.title} onChange={this.titleHandler} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="descIn">Description</label>
                                <input type="text" className="form-control" id="descIn" value={this.state.description} onChange={this.descHandler} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="matTypeIn">Material Type</label>
                                <select className="form-control" id="matTypeIn" value={this.state.matType} onChange={this.typeHandler} required>
                                    <option value='Plastic'>Plastic</option>
                                    <option value='Electronics'>Electronics</option>
                                    <option value='Rubber'>Rubber</option>
                                    <option value='Textiles'>Textiles</option>
                                    <option value='Cardboard'>Cardboard</option>
                                    <option value='Glass'>Glass</option>
                                    <option value='Metal'>Metal</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="matWeightIn">Material Weight (lbs)</label>
                                <input type="text" className="form-control" id="matWeightIn" value={this.state.matWeight} onChange={this.weightHandler} required/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='googAuto'>Pickup Address</label>
                                <Autocomplete
                                    className="form-control"
                                    onPlaceSelected={(place) => this.setState({address: place.formatted_address})}
                                    types={['address']}
                                    componentRestrictions={{country: 'USA'}}
                                    required/>
                            </div>

                            <div className='form-group'>
                            <label htmlFor="dateIn">Select Pickup Date</label>
                            <input type="date" className="form-control" id="dateIn" value={this.state.date} name="pickup_date_time" onChange={this.dateHandler} required/>
                            </div>

                        <button type="submit" className="btn btn-primary" onClick={this.createNewListing}> Create New Listing</button>
                        </form>
                    </div>

                </div>

            </div>
        );
    }
}
