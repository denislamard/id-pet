import React, {Fragment} from "react";
import {BasePage} from './base';

class FindPage extends BasePage {

    render() {
        return (
            <Fragment>
                <h1>Find a Pet </h1>
                <p>{this.state.account}</p>
            </Fragment>
        );
    }
}

export default FindPage;