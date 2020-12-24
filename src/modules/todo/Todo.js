import React from 'react';
import Todoitem from './Todoitem'
import Formtodo from './Formtodo'

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: [] };
        this.removeItem = this.removeItem.bind(this);
      
        this.addItem = this.addItem.bind(this);
      }
    
      componentDidMount() {  
        let items = [];
        items.push({id:1,text:'a'});
        items.push({id:2,text:'b'});
        this.setState({items:items});
      }
      componentWillUnmount() {  

      }

      
      addItem(txt){
        let items = this.state.items;
        items.push({ id:null,text:txt});
        this.setState({items:items});
      }

      removeItem(item){
          let items = this.state.items;
          items.splice(item.ind,1);
          this.setState({items:items});
        }

    render(){

        const data =  this.state.items.map( (item,index) => {
            return <li><Todoitem text={item.text} id={item.id} ind={index} delete={this.removeItem} /></li>        
        })  

        return (
            <div className="wrapper-list">
                <Formtodo submit={this.addItem}  />
                <hr />
                <ul className="todoList">{data}</ul>

            </div>
            
        )
    }
}

export default Todo;