import React from 'react';
import Todoitem from './Todoitem'
import Formtodo from './Formtodo'


// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database"
//import "firebase/firestore";


class Todo extends React.Component {

    
    static STATUS = {
        PENDING : '0',
        TOREVIEW: '1', 
        CLOSE: '2'
    } 

    static EMPTY_TODO = {
        id: '',
        ind: '',
        text: '',
        status: '0',
    }

    constructor(props) {
        super(props); 

       this.setUpStorage();

        this.state = {
            items: [],   
            currentItem: Todo.EMPTY_TODO
        };

        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.edit = this.edit.bind(this);
      }

      setUpStorage(){
        const firebaseConfig = {
            apiKey: "AIzaSyA1ktZMMQ1-KKkN52Aftb7TjwParhi4Hs4",
            authDomain: " todolist-62b44.firebaseapp.com",
            databaseURL: "https://todolist-62b44-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "todolist-62b44",
            //storageBucket: "PROJECT_ID.appspot.com",
            //messagingSenderId: "SENDER_ID",
            //appId: "561476173039",
            //measurementId: "G-MEASUREMENT_ID",          
          };
          
          // Initialize Firebase
          this.fireaApp = firebase.initializeApp(firebaseConfig);
          
          this.database = this.fireaApp.database();
          this.todoListRef = this.database.ref('todos');


      
          this.todoListRef.on('child_added', (snapshot) => {
            //this.dataAddedToDB(data);
           // console.log( data, 'DATA FROM DB child_added');
            //console.log( data.key, 'DATA FROM DB child_added KEY');
            //console.log( data.value, 'DATA FROM DB child_added');
            let items = this.state.items;
            let data = snapshot.val();
            
            items.push({
                    id: snapshot.key,
                    status: data.status ,
                    text: data.text ,
                    
            });
    
             

              this.setState({items: items});


          });
          



          
          this.todoListRef.on('child_changed', (data) => {
            //setCommentValues(postElement, data.key, data.val().text, data.val().author);
           
            let items = this.state.items;
            

                
            for(let i=0; i< items.length  ; i++){
               
               
                if( items[i].id == data.key ){
                    let item = items[i];                   
                    item.text = data.val().text;
                    item.status = data.val().status;
                    items[i] = item;
                }
                
            }
            this.setState({items: items});

          });
          /*
          this.todoListRef.on('child_removed', (data) => {
            deleteComment(postElement, data.key);
          });
          */

      }


    
      componentDidMount() {  
        
        this.setState({currentItem: Todo.EMPTY_TODO } );

        this.todoListRef.get();
      }

      componentWillUnmount() {  

      }


      edit(item){
          this.setState({currentItem: item});          
      }
      
      addItem(item){
        let items = this.state.items;
      
        if( item.id === ''){
            //items.push(item);
             var newPostRef = this.todoListRef.push();
             newPostRef.set({
                 text: item.text,
                 status: item.status,
             });
            
        }
        else{
            var newPostRef = this.todoListRef.child(item.id);
            newPostRef.set({
                text: item.text,
                status: item.status,
            });
            
        }
        
        this.setState({
            items:items
        });
        this.setState({currentItem: Todo.EMPTY_TODO })
      }

      removeItem(item){

        var newPostRef = this.todoListRef.child(item.id);
            newPostRef.remove();

          let items = this.state.items;
          items.splice(item.ind,1);
          this.setState({items:items});
      }

    render(){
               
        const data =  this.state.items.map( (item,index) => {
          
            return <li><Todoitem  text={item.text} id={item.id} ind={index} status={item.status} delete={this.removeItem} edit={this.edit} /></li>        
        })  

        return (
            <div className="wrapper-list">
                <Formtodo submit={this.addItem} item={this.state.currentItem}  /> 
                <hr />
                <ul className="todoList">{data}</ul>

            </div>
            
        )
    }
}

export default Todo;