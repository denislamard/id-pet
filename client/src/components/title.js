import {Component} from 'react'

export class Title extends Component {

    componentDidMount() {
        document.title = this.props.name + ' version ' + this.props.version;
    }

    render() {
        return null;
    }
}