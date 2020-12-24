import React from 'react';

class Todoitem extends React.Component {

    constructor(props) {
        super(props);
        
        // Cette liaison est nécéssaire afin de permettre    
        // l'utilisation de `this` dans la fonction de rappel.    this.handleClick = this.handleClick.bind(this);
        this.delete = this.delete.bind(this);    
      }
    
      componentDidMount() {  
      
      }
      componentWillUnmount() {  

      }
      delete() {
          this.props.delete(this.props);
      }


    render(){
        return (
           <div className="todoitem">{this.props.text} - {this.props.ind} / {this.props.id} <button onClick={this.delete} className="btn btn-danger">Delete</button></div>
        )
    }
}

export default Todoitem;