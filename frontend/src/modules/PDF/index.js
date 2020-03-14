import React,{ Component } from 'react';
import {
    Button, message
} from 'antd';
import PDF from 'react-pdf-js';
import './pdf.less';

class Pdf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            show: false
        }
    }
    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
      }
    
    handlePrevious = () => {
      let page = this.state.page;
      if (page == 0) {
        message.warning("此页已为第一页");
        return;
      }
      this.setState({ page: this.state.page - 1 });
    }
  
    handleNext = () => {
      let page = this.state.page;
      let pages = this.state.pages;
      if (page == pages) {
        message.warning('此页已为最后一页');
        return;
      }
      this.setState({ page: this.state.page + 1 });
    }
    
    componentDidMount() {
        console.log(this.props)
        let data = this.props.location.search.split("?data=")[1];
        this.setState({
            content: data
        })
    }
    onMouseEnter() {
      this.setState({
        show:true
      })
    }
    onMouseLeave() {
      this.setState({
        show: false
      })
    }
    render() {
        const {
            content
          } = this.state;

        return(
          <div className="pdfContainer">
            <div className="Content">
                <PDF
                file={content}
                onDocumentComplete={this.onDocumentComplete}
                page={this.state.page}
                />
            </div>
            <div className="btnContainer" onMouseEnter={()=>this.onMouseEnter()} onMouseLeave={()=>this.onMouseLeave()}>
              <div className="box" style={this.state.show?{height:'62px', display:'block'}:{height:'0px',display:'none'}}>
                <Button onClick={()=>this.handlePrevious()}>上一页</Button>
                <Button onClick={()=>this.handleNext()}>下一页</Button>
              </div>
            </div>
          </div>
        )
    }
}

export default Pdf