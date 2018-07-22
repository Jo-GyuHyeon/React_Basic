import React, { Component, Fragment } from 'react';

class PhoneInfo extends Component {

	state = {
		editing: false,
		name: '',
		phone: ''
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state !== nextState) {
			return true
		}
		return this.props.info !== nextProps.info;
	}

	handelClick = () => {
		const { info, onClick } = this.props
		// onClick(info.id)
		onClick(info.get('id'))
	}

	handelRemove = () => {
		const { info, onRemove } = this.props;
		// onRemove(info.id)
		// *** immutable js 사용
		onRemove(info.get('id'))
	}

	handelKeyPress = (e) => {
		if(e.charCode===13){
			//enterKey Press 로 click 하는 방법
			this.handelToggleEdit()
			console.log('enterKey Press')
		}
	}

	handelToggleEdit = () => {
		const { info, onUpdate } = this.props;

		if (this.state.editing) {
			// onUpdate(info.id, {
			// 	name: this.state.name,
			// 	phone: this.state.phone
			// });
			// *** immutable js 사용
			onUpdate(info.get('id'), {
				name: this.state.name,
				phone: this.state.phone
			});
		}
		else {
			// this.setState({
			// 	name: info.name,
			// 	phone: info.phone
			// })
			// *** immutable js 사용
			this.setState({
				name: info.get('name'),
				phone: info.get('phone')
			})
		}
		this.setState({
			editing: !this.state.editing,
		});
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		// const { name, phone } = this.props.info;
		const name = this.props.info.get('name');
		const phone = this.props.info.get('phone');
		const { editing } = this.state;
		const style = {
			border: '1px solid black',
			padding: '8px',
			margin: '8px',
		}
		console.log(name)
		return (
			// <div style={style}>
			// div 문제 발생...
			<div style={style} onClick={this.handelClick}>
				{
					editing ? (
						<Fragment>
							<div>
								<input
									onChange={this.handleChange}
									name='name'
									value={this.state.name}
									onKeyPress={this.handelKeyPress}
								/>
							</div>
							<div>
								<input
									onChange={this.handleChange}
									name='phone'
									value={this.state.phone}
									onKeyPress={this.handelKeyPress}
								/>
							</div>
						</Fragment>
					) : (
							<Fragment>
								{/* <div onClick={this.handelClick}><b>{name}</b></div> */}
								<div><b>{name}</b></div>
								<div>{phone}</div>
							</Fragment>
						)
				}
				<button onClick={(e) => { e.stopPropagation(); this.handelRemove()}}>제거</button>
				<button onClick={(e) => { e.stopPropagation(); this.handelToggleEdit()}}>{editing ? '적용' : '수정'}</button>
				{/* <button onClick={this.handelRemove}>제거</button>
				<button onClick={this.handelToggleEdit}>{editing ? '적용' : '수정'}</button> */}
			</div>

		);
	}
}

export default PhoneInfo;