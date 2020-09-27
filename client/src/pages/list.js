import React, {Fragment} from "react";
import {BasePage} from './base';



class ListPage extends BasePage {

    render() {
        return (
            <Fragment>
                <h1>list</h1>
                <p>{this.state.account}</p>
            </Fragment>
        );
    }
}

export default ListPage;