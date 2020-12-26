import React from 'react';

class Todoitem extends React.Component {

    constructor(props) {
        super(props);
        
        // Cette liaison est nécéssaire afin de permettre    
        // l'utilisation de `this` dans la fonction de rappel.    this.handleClick = this.handleClick.bind(this);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);    
      }
    
      
      delete() {
          this.props.delete(this.props);
      }

      edit(){
        this.props.edit( {
            id: this.props.id,
            ind: this.props.ind,
            text: this.props.text,
            status: this.props.status
        } );
      }


    render(){

        let lblStatus = 'PENDING';
       
        switch(this.props.status){
            case '0':
                lblStatus = "PENDING";
                break;
            case '1':
                lblStatus = "TO REVIEW";
                break;
            case '2':
                lblStatus = "CLOSE";
                break;
        }
      
        return (
           <div className="todoitem">
               <div className="row">
                    <div className="col-md-3">
                        {this.props.text} - {this.props.ind} / {this.props.id} 
                    </div>
                    <div className="col-md-3">
                        {lblStatus}
                    </div>
                    <div className="col-md-3">
                        <button onClick={this.edit} className="btn btn-warning">Edit</button>  &nbsp;
                        <button onClick={this.delete} className="btn btn-danger">Delete</button>
                    </div>
               </div>
               
            
           </div>
        )
    }
}

export default Todoitem;