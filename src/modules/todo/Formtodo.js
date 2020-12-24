import React from 'react'


class Formtodo extends React.Component{

    constructor(props) {
        super(props);
        this.state = { newItem:''};
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
      }

    handleChange(event) {  
        this.setState({newItem: event.target.value});
     }

     addItem(event){
        event.preventDefault();
        let txt = this.state.newItem;
        console.log( txt );
        this.props.submit(txt);
        this.setState({newItem: ''});

      }

    render(){
        return (
            <form onSubmit={this.addItem} className="row g-3" method="post">
                <div className="form-item-wrapper">
                    <label for="newtodoitem" className="form-label">Todo task:</label>
                    <input type="text" id="newtodoitem" name="newtodoitem" className="form-text form-control" 
                    defaultValue={this.state.newItem} required size="16" maxLength="50" onChange={this.handleChange}  />
                </div>    
                <div className="form-item-wrapper form-action">
                    <input className="btn btn-primary" type="submit" value="Add item" />
                    
                </div>
            </form>
        );    
    }
}

export default Formtodo;