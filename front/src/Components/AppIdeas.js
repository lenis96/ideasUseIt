import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import { Button ,Col} from 'reactstrap';
import {getBoards} from './../utils/api'

import Board from './Board'
class AppIdeas extends Component {
    // constructor(props){
    //     super(props)
    //     this.state= {
    //       redirectToReferrer: false
    //     };
    // }
    
    // login = () => {
    //   this.props.fakeAuth.authenticate(() => {
    //     this.setState({ redirectToReferrer: true });
    //   });
    // };
    
    // render() {
    //     console.log(this.state)
    //   const { from } = this.props.location.state || { from: { pathname: "/" } };
    //   const { redirectToReferrer } = this.state;
  
    //   if (redirectToReferrer) {
    //     return <Redirect to={from} />;
    //   }
  
    //   return (
    //     <div>
    //       <p>You must log in to view the page at {from.pathname}</p>
    //       <Button onClick={this.login}>Log in</Button>
    //     </div>
    //   );
    // }

    constructor(props){
        super(props)
        this.state={boards:[]}
    }
    componentDidMount(){
        getBoards().then(res=>{
            console.log(res.data)
            this.setState({boards:res.data})
        })
    }
    render(){
        console.log(this.state)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>App Ideas</h2>
                    </div>
                </div>
                <div className="row">
                   
                    {this.state.boards.map(e=>{
                        return (
                            <Col xs="4" className="mb-4">
                                <Board key={e.id} title={e.title}  ideas={e.ideas}/>
                            </Col>
                        )
                    })}


                </div>
            </div>
        )
    }
  }
export default AppIdeas