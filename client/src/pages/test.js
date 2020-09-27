import React, {Component} from 'react';
import {MDBContainer} from "mdbreact";
import MDBFileupload from 'mdb-react-fileupload';

const ipfsClient = require('ipfs-http-client')

class Test extends Component {

    constructor() {
        super()
        this.state = {
            added_file_hash: null,
            selectedFile: null
        }


    }


    handleFileuploadChange = file => {
        this.setState({
            selectedFile: file
        })
        console.log(this.state);
        console.log(this.state.selectedFile.name);
        console.log(this.fileupload);
    }

    onSubmitHandler = e => {
        e.preventDefault();

        this.saveToIpfsWithFilename([this.state.selectedFile]);
    }

    // https://ipfs.io/ipfs/QmVehPSpyPyrP9gsYMc2LXBAxSyYoCADA14icjxcNKnXcH

    //https://ipfs.infura.io:5001/api/v0/ Qmbxc9Lj1uCmWkLgM65vmCxgimTrU6y9KFQECqAUmqwtwT

    //curl --output data.jpg -X POST "https://ipfs.infura.io:5001/api/v0/get?arg=QmVehPSpyPyrP9gsYMc2LXBAxSyYoCADA14icjxcNKnXcH"
    //curl --output data.jpg -X POST "https://ipfs.infura.io:5001/api/v0/cat?arg=QmVehPSpyPyrP9gsYMc2LXBAxSyYoCADA14icjxcNKnXcH"

    async saveToIpfsWithFilename([file]) {
        const ipfs = await ipfsClient('https://ipfs.infura.io:5001/api/v0/');
        const fileDetails = {
            path: file.name,
            content: file,
            added_file_hash: null
        }
        /*
        const options = {
            wrapWithDirectory: true,
            progress: (prog) => console.log(`received: ${prog}`)
        }
        */
        try {
            const added = await ipfs.add(fileDetails);
            //console.log(added)
            this.setState({added_file_hash: added.cid.toString()})
            //console.log(this.state);
        } catch (err) {
            console.error(err)
        }
    }


    render() {
        return (
            <MDBContainer>
                <p>{this.state.added_file_hash}</p>
                <img src="https://ipfs.io/ipfs/QmVehPSpyPyrP9gsYMc2LXBAxSyYoCADA14icjxcNKnXcH"/>
                <hr/>
                <form>
                    <MDBFileupload

                        getValue={this.handleFileuploadChange}
                        allowedFileExtensions={['jpg', 'png', 'bmp']}
                        containerHeight={500}
                        maxFileSize="5M"
                        showSubmitButton
                        onSubmitHandler={this.onSubmitHandler}
                        ref={fileupload => this.fileupload = fileupload}
                    />
                </form>

            </MDBContainer>
        );
    }
};

export default Test;