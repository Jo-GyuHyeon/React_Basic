import React, { Component } from 'react';

class PhonDetails extends Component {
	static defaultProps = {
		contact:{
			name:'',
			phone:''
		}
	}
	render() {
		const details = (
			<div>
				<p>{this.props.contact.name}</p>
				<p>{this.props.contact.phone}</p>
			</div>
		);
		const blank = (<div>Not Selected</div>);

		return (
			<div>
				{this.props.isSelected ? details : blank}
			</div>
		);
	}
}

export default PhonDetails;