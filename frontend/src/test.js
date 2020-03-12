import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        }
    }
    componentDidMount() {
        console.log(this.props)
        let data = this.props.location.search.split("?data=")[1];
        this.setState({
            content: data
        })
    }
    render() {
        return (
            <FileViewer
                filePath={this.state.content}
                fileType='docx'
            />
        )
    }
}

export default Test;