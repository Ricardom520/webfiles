import React,{ Component } from 'react';
import {
    Button
} from 'antd';
import PDF from 'react-pdf-js';

class Pdf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        }
    }
    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
      }
    
      handlePrevious = () => {
        this.setState({ page: this.state.page - 1 });
      }
    
      handleNext = () => {
        this.setState({ page: this.state.page + 1 });
      }
    
      renderPagination = (page, pages) => {
        let previousButton = <div ><Button type="primary" onClick={this.handlePrevious}>上页</Button></div> ;
        if (page === 1) {
          previousButton = <div ><Button type="primary">上页</Button></div> 
        }
        let nextButton =<div ><Button type="primary" onClick={this.handleNext}>下页</Button></div>;
        if (page === pages) {
          nextButton = <div ><Button type="primary">下页</Button></div> ;
        }
        return (
          <nav>
            <div >
              {previousButton}
              {nextButton}
            </div>
          </nav>
          );
      }
    componentDidMount() {
        console.log(this.props)
        let data = this.props.location.search.split("?data=")[1];
        this.setState({
            content: data
        })
    }
    render() {
        const {
            content
          } = this.state;
           //翻页
           let pagination = null;
          if (this.state.pages) {
            pagination = this.renderPagination(this.state.page, this.state.pages);
          }

        return(
            <div>
            <div style={{overflow:'scroll',height:600}}>
                <PDF
                file={content}
                onDocumentComplete={this.onDocumentComplete}
                page={this.state.page}
                /> 
                 {pagination}
            </div>
          </div>
        )
    }
}

export default Pdf