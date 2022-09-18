import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Welcome from './Welcome';


class StartPage extends Component{

//Added by Bharat
    render(){
        return(
            <div>

                <Route exact path="/" render={() => (
                    <div>
                        <Welcome />
                    </div>
                )}/>

            </div>
        );
    }




}

export default withRouter(StartPage);