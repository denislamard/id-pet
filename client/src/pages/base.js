import {Component} from "react";

export class BasePage extends Component {
    constructor(props) {
        super(props);
        this.state = {web3: props.web3, account: props.account};
    }
}
