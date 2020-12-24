import ReactDOM from 'react-dom'
import React from 'react'
import Todo from './modules/todo/Todo'


class App extends React.Component {

    render() {

        return(
            <div class="todolist">
                <h1>A todo list in react</h1>
                <Todo />
            </div>
            
        );
    }
    
}
export default App;
 
ReactDOM.render( <App />, document.getElementById('root'));