import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
	static defaultProps = {
		data: []
	}

	render() {
		const { data, onRemove, onUpdate, onClick } = this.props;
		console.log('rendergin list ')
		const list = data.map(
			info => (
				<PhoneInfo
					onRemove={onRemove}
					onUpdate={onUpdate}
					info={info}
					key={info.id}
					onClick={() => onClick(info.id)}
				/>)
		);
		return (
			<div>
				{list}
			</div>
		);
	}
}

export default PhoneInfoList;