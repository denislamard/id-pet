import React, {Fragment} from "react";
import {BasePage} from './base';

class ChangePage extends BasePage {

    render() {
        return (
            <Fragment>
                <h1>Change owner</h1>
                <p>{this.state.account}</p>
            </Fragment>
        );
    }
}

export default ChangePage;