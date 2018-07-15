import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';
import PhonDetails from './components/PhonDetails';
import update from 'react-addons-update'

class App extends Component {

  id = 3;

  state = {
    information:[
      {
        id: 0,
        name: '홍길동',
        phone: '010-0000-1111'
      },
      {
        id: 1,
        name: '김지숙',
        phone: '010-0000-2222'
      },
      {
        id: 2,
        name: '조리규',
        phone: '010-0000-3333'
      },
    ],
    keyword: '',
    selectedKey: -1,
  }

  componentWillMount(){
    const information = localStorage.information;

    if(information){
      this.setState({
        information:JSON.parse(information)
      })
    }
  }

  componentDidUpdate(prevProps,prevState){
    if(JSON.stringify(prevState.information) !== JSON.stringify(this.state.information)){
      localStorage.information = JSON.stringify(this.state.information);
    }
  }

  handleClick = (key) => {
    this.setState({
      selectedKey: key
    })
    console.log(key, 'is selected')
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    })
  }

  handleCreate = (data) => {
    const { information } = this.state
    this.setState({
      //***전개 연산자 사용
      // information: information.concat({
      //   ...data,
      //   id: this.id++
      // })
      // ***immutability helper js 
      information: update(this.state.information,{
        $push:[data,this.id++]
      })
      // *** immutable js 사용
    });
    console.log(information)
  }

  handleRemove = (id) => {
    const { information } = this.state
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  handelUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(info => {
        if (info.id === id) {
          return {
            id,
            ...data,
          };
        }
        return info;
      })
    });
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <input
          value={this.state.keyword}
          onChange={this.handleChange}
          placeholder='검색...'
        />
        <PhonDetails
          isSelected={this.state.selectedKey !== -1}
          contact={this.state.information[this.state.selectedKey]}
        />
        <PhoneInfoList
          data={this.state.information.filter(
            info => info.name.indexOf(this.state.keyword) > -1
          )}
          onRemove={this.handleRemove}
          onUpdate={this.handelUpdate}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;
