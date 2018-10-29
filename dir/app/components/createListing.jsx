import React from 'react'
import Axios from 'axios';
import urls from './Urls.js';
import history from './history.js'
import Autocomplete from 'react-google-autocomplete'

//uncomment file when database is updated

export default class createListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            matType: '',
            matWeight: '',
            image: '',
            zipcode: '',
            imagePreviewUrl: ''

        };
        this.titleHandler = this.titleHandler.bind(this);
        this.descHandler = this.descHandler.bind(this);
        this.typeHandler = this.typeHandler.bind(this);
        this.weightHandler = this.weightHandler.bind(this);
        this.zipHandler = this.zipHandler.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
        this.createNewListing = this.createNewListing.bind(this);

    }
    titleHandler(event) {
        this.setState({
            title: event.target.value
        });
    }
    componentDidMount() {
        if(window.localStorage.getItem('token') === null) {
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
    zipHandler(event) {
      if (this.isNumeric(event.target.value)) {
        this.setState({
            zipcode: event.target.value
        });
      }
    }
  imageHandler(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
  imageHandler(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
    createNewListing() {
        let newObj = {
            title: this.state.title,
            description: this.state.description,
            material_type: this.state.matType,
            material_weight: parseFloat(this.state.matWeight),
            image: this.state.image,
            user_id: parseInt(window.localStorage.getItem('userid')),
        }
        Axios.post(`http://recyclr.xyz/listing`, newObj, {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                'Access-Control-Allow-Origin': '*'
            }},)

        .then(function(result) {
            console.log(result);
            //history.push('/listings');
        }).catch(function(error) {
            console.log(error);
        });
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="titleIn">Title</label>
                                <input type="text" className="form-control" id="titleIn" value={this.state.title} onChange={this.titleHandler}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="descIn">Description</label>
                                <input type="text" className="form-control" id="descIn" value={this.state.description} onChange={this.descHandler}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="matTypeIn">Material Type</label>
                                <input type="text" className="form-control" id="matTypeIn" value={this.state.matType} onChange={this.typeHandler}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="matWeightIn">Material Weight (lbs)</label>
                                <input type="text" className="form-control" id="matWeightIn" value={this.state.matWeight} onChange={this.weightHandler}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='googAuto'>Pickup Address</label>
                                <Autocomplete
                                    onPlaceSelected={(place) => console.log(place)}
                                    types={['address']}
                                    componentRestrictions={{country: 'USA'}}
                                />
                            </div>

                            <div className="previewComponent">
                              <form onSubmit={(e)=>this._handleSubmit(e)}>
                                <input className="fileInput"
                                  type="file"
                                  onChange={(e)=>this.imageHandler(e)} />
                                </form>
                          </div>
                        <button className="btn btn-primary" onClick={this.createNewListing}> Create New Listing</button>
                    </div>
                </div>
            </div>
        );
    }
}
