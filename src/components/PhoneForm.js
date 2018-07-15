import React, { Component } from 'react';

class PhoneForm extends Component {
	//input = null;
	input = React.createRef();

	state = {
		name: '',
		phone: '',
	}

	handelChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handelSubmit = (e) => {
		e.preventDefault();
		this.props.onCreate(this.state)
		this.setState({
			name: '',
			phone: '',
		})
		//this.input.focus();
		this.input.current.focus();

	}

	handelKeyPress(e) {
		if(e.charCode===13){
			//enterKey Press 로 click 하는 방법
			this.handelSubmit()
			console.log('enterKey Press')
		}
	}

	render() {
		return (
			<form onSubmit={this.handelSubmit}>
				<input
					name='name'
					paceholder='이름'
					onChange={this.handelChange}
					value={this.state.name}
					//ref={ref => this.input = ref}
					ref={this.input}
				/>
				<input
					name='phone'
					paceholder='전화번호'
					onChange={this.handelChange}
					value={this.state.phone}
					onKeyPress={this.handelKeyPress}
				/>
				<button>전송</button>

			</form>
		);
	}
}

export default PhoneForm;