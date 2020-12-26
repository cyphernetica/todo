import React from 'react'


class Formtodo extends React.Component{

    constructor(props) {
      
        super(props);
   
            this.state = { 
                id: this.props.item.id,
                ind: this.props.item.ind,
                text: this.props.item.text,
                status: this.props.item.status,
             };
        
        
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
      }

      componentDidMount() {  
        
            this.setState(
                {
                  id: this.props.item.id,
                  ind: this.props.item.ind,
                  text: this.props.item.text,
                  status: this.props.item.status,
                }
            );
       
        
        
      } 

      componentDidUpdate(prevProps){
         
        if(prevProps && 
            (
                prevProps.item.text != this.props.item.text  ||
                prevProps.item.status != this.props.item.status 
            )
        ){
           
          
            this.setState({
                id: this.props.item.id ,
                ind: this.props.item.ind ,
                text: this.props.item.text,
                status: this.props.item.status,
            });
        }

    
       
      }

    handleChange(event) {  
        const target = event.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        const value = target.value;
        const name = target.name;

       

        this.setState({
            [name]: value    
        });

       
     }

     addItem(event){
        event.preventDefault();
      

        let item = {
            id: this.state.id,
            ind: this.state.ind,
            text: this.state.text,
            status: this.state.status,
        }

       

        this.props.submit(item);
    
        this.setState(
            {
              id: '',
              ind: '',
              text: '',
              status: '0',
            }
        );

      }

    render(){
      
        let lblBtnSave = this.state.ind === '' ? 'Add' : 'Update';
        return (
            <form onSubmit={this.addItem} className="row g-3" method="post">
                
                <input type="hidden" name="id" value={this.state.id}  onChange={this.handleChange} />
                <input type="hidden" name="ind" value={this.state.ind} onChange={this.handleChange} />
                <div className="form-item-wrapper">
                    <label for="text" className="form-label">Todo task:</label>
                    <input type="text" id="text" name="text" className="form-text form-control" 
                    value={this.state.text} required size="16" maxLength="50" onChange={this.handleChange}  />
                </div>    
                <div className="form-item-wrapper">
                    <select onChange={this.handleChange} name="status" value={this.state.status}>
                        <option value="0">PENDING</option>
                        <option value="1">TO REVIEW</option>
                        <option value="2">CLOSE</option>
                    </select>
                </div>
                <div className="form-item-wrapper form-action">
                    <input className="btn btn-primary" type="submit" value={lblBtnSave} />
                </div>
            </form>
        );    
    }
}

export default Formtodo;