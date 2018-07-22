import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';
import PhonDetails from './components/PhonDetails';
// import update from 'react-addons-update'
import { Map, List } from 'immutable';

class App extends Component {

	id = 3;

	// state = {
	//   information:[
	//     {
	//       id: 0,
	//       name: '홍길동',
	//       phone: '010-0000-1111'
	//     },
	//     {
	//       id: 1,
	//       name: '김지숙',
	//       phone: '010-0000-2222'
	//     },
	//     {
	//       id: 2,
	//       name: '조리규',
	//       phone: '010-0000-3333'
	//     },
	//   ],
	//   keyword: '',
	//   selectedKey: -1,
	// }
	// *** immutable js 사용
	state = {
		data: Map({
			information: List([
				Map({
					id: 0,
					name: '홍길동',
					phone: '010-0000-1111'
				}),
				Map({
					id: 1,
					name: '김지숙',
					phone: '010-0000-2222'
				}),
				Map({
					id: 2,
					name: '조리규',
					phone: '010-0000-3333'
				})
			]),
			keyword: '',
			selectedKey: -1,
		})
	}

	componentWillMount() {
	  const information = localStorage.information;

	  if (information) {
	    this.setState({
	      information: JSON.parse(information)
	    })
	  }
	}

	componentDidUpdate(prevProps, prevState) {
	  if (JSON.stringify(prevState.information) !== JSON.stringify(this.state.information)) {
	    localStorage.information = JSON.stringify(this.state.information);
	  }
	}

	handleClick = (key) => {
		// this.setState({
		//   selectedKey: key
		// })
		// *** immutable js 사용
		this.setState({
			data: this.state.data.set('selectedKey', key)
		})
		console.log(key, 'is selected')
	}

	handleChange = (e) => {
		// this.setState({
		//   keyword: e.target.value,
		// })
		// *** immutable js 사용
		this.setState({
			data: this.state.data.set('keyword', e.target.value)
		});
	}

	handleCreate = (data) => {
		// const { information } = this.state
		const map_id = Map({
			id: this.id++
		});
		const map_data = Map(data);

		this.setState({
			//***전개 연산자 사용
			// information: information.concat({
			//   ...data,
			//   id: this.id++
			// })
			// ***immutability helper js 
			// information: update(this.state.information,{
			//   $push:[data,this.id++]
			// })
			// *** immutable js 사용
			data: this.state.data.update('information', information => information.push(
				map_data.merge(map_id)
			))
		});
		// console.log(information)
	}
	handleRemove = (id) => {
		// const { information } = this.state
		//   // *** immutable js 사용
		console.log('call handleRemove')
		const {data} = this.state;
		const information = data.get('information').filter(info => info.get('id') !== id)
		this.setState({
			//   // information: information.filter(info => info.id !== id)
			//   // *** immutable js 사용
			data: this.state.data.set('information',information)

		});
	}

	handelUpdate = (id, data) => {
		// const { information } = this.state;
		// *** immutable js 사용		
		console.log('call handelUpdate')
		const information = this.state.data.get('information').map(
			info => {
			if (info.get('id') === id) {
						const map_id = Map({
							id: this.id++
						});
						const map_data = Map(
							data
						);
						return map_data.merge(map_id);
					}
					return info;
				}
		)
		this.setState({
			// information: information.map(info => {
			//   if (info.id === id) {
			//     return {
			//       id,
			//       ...data,
			//     };
			//   }
			//   return info;
			// })
			// *** immutable js 사용
			data: this.state.data.set('information',information)
		});

		console.log(this.state.data.get('infromation'))
	}

	render() {
		// *** immutable js 사용
		const { data } = this.state
		const information = data.get('information')
		const selectedKey = data.get('selectedKey')
		const keyword = data.get('keyword')

		return (
			<div>
				<PhoneForm onCreate={this.handleCreate} />
				<input
					// value={this.state.keyword}
					// *** immutable js 사용
					value={keyword}
					onChange={this.handleChange}
					placeholder='검색...'
				/>
				<PhonDetails
					// isSelected={this.state.selectedKey !== -1}
					// contact={this.state.information[this.state.selectedKey]}
					// *** immutable js 사용
					isSelected={selectedKey !== -1}
					contact={information.get(selectedKey)}
				/>
				<PhoneInfoList
					// data={this.state.information.filter(
					//   info => info.name.indexOf(this.state.keyword) > -1
					// )}
					// *** immutable js 사용
					data={information.filter(
						info => info.get('name').indexOf(keyword) > -1)}
					onRemove={this.handleRemove}
					onUpdate={this.handelUpdate}
					onClick={this.handleClick}
				/>
			</div>
		);
	}
}

export default App;
