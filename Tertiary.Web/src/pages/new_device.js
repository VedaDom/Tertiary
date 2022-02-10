import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from '../helpers/browserHistory';
import { newDevice } from '../store/actions/device.action';

class NewDevicePage extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);

        this.state = {
            loading: false,
            type: "Laptops",
            name: "",
            brand: "Lenovo",
            description: "",
            quantity: "",
            image: "",
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value,
            brand: e.target.value == "Phone" ? "Samsung" : "Lenovo"
        });
    }

    onChangeBrand(e) {
        this.setState({
            brand: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value,
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value,
        });
    }

    handleOnSave(e){
        e.preventDefault();

        this.setState({
            loading: true,
        });

        const { dispatch } = this.props;

        dispatch(newDevice({
            type: this.state.type,
            name: this.state.name,
            brand: this.state.brand,
            description: this.state.description,
            quantity: this.state.quantity,
            image: this.state.image,
        })).then((data) => {
            console.log(data);
            browserHistory.back();
        }).catch(() => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        return (
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle bg-blue-600">
                    <div className="p-4 grid align-middle grid-flow-col  place-content-between">
                        <label className="p-4 place-self-center py-[11px] font-bold text-white text-xl">New device</label>
                    </div>
                    <div className="bg-white p-8">
                        <form onSubmit={this.handleOnSave} method="POST" className="grid grid-cols-2">
                            <div className="">
                                <div className="mb-4">
                                    <label htmlFor="devices" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Device name</label>
                                    <input
                                        id="device-name"
                                        name="devicename"
                                        type="text"
                                        autoComplete="text"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Device name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="device-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Device type</label>
                                    <select
                                        value={this.state.type}
                                        onChange={this.onChangeType}
                                        id="device-type" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                                        <option>Laptop</option>
                                        <option>Phone</option>
                                    </select>
                                </div>
                                {this.state.type == "Phones" ? (<div className="mb-6">
                                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Brand</label>
                                    <select 
                                        value={this.state.brand}
                                        onChange={this.onChangeBrand}
                                        id="brand" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                                        <option>Samsung</option>
                                        <option>Apple</option>
                                        <option>Huawei</option>
                                        <option>Nokia</option>
                                        <option>Oppo</option>
                                        <option>Tecno</option>
                                    </select>
                                </div>) : (<div className="mb-4">
                                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Brand</label>
                                    <select
                                        value={this.state.brand}
                                        onChange={this.onChangeBrand}
                                        id="brand" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                                        <option>Lenovo</option>
                                        <option>HP</option>
                                        <option>Dell</option>
                                        <option>Apple</option>
                                        <option>Asus</option>
                                    </select>
                                </div>)}
                                <div className="mb-4">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Device name</label>
                                    <input
                                        id="description"
                                        name="description"
                                        type="text"
                                        autoComplete="text"
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Description"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Device name</label>
                                    <input
                                        id="image"
                                        name="image"
                                        type="text"
                                        autoComplete="text"
                                        value={this.state.image}
                                        onChange={this.onChangeImage}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Image"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quantity</label>
                                    <input
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        value={this.state.quantity}
                                        onChange={this.onChangeQuantity}
                                        required
                                        className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Quantity"
                                    />
                                </div>
                                <div className="pt-6 grid grid-cols-2">
                                    <button
                                        type="submit"
                                        disabled={this.state.loading}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {this.state.loading && (<svg className="absolute left-3 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>)}
                                        Save
                                    </button>
                                    <div></div>
                                </div>
                            </div>
                            <div></div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(NewDevicePage);