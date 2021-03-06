import React , {Component, Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import '../social.less';
import {common, icon} from '../../../../images';
import SingleP from '../../../../components/SingleP';
import ContentS from '../../../../components/ContentS';
import RecomBP from '../../../../components/RecomBP';
import Photos from '../../../../components/Photos';
import {
    initDataPdf,
} from '../../models/social';

import {
    openDataPdfRequest
} from '../../services';
const pdful = require('../染色体.pdf');

class singlepPD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiably: true,
            pdfData: [],
            index: 0,
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.bindHandleScroll);
    }
    bindHandleScroll = (e) => {
        const scrollTop = (e.srcElement?e.srcElement.documentElement.scrollTop:false)
                            || window.pageYOffset
                            || (e.srcElement?e.srcElement.body.scrollTop : 0);
        let n;
        let index = this.state.index;
        if (100 < scrollTop && scrollTop < 300) {
            n = 1;
            if (n < index) {
                return;
            } else {
                this.setState({
                    index: n
                })
            }
        } else if (300 < scrollTop) {
            n = Math.ceil((scrollTop - 100) / 300);
            if (n < index) {
                return;
            } else {
                this.setState({
                    index: n
                })
            }
        }
        if (index == 0 && n == 1) {
            index = 1;
            this.setState({
                index:index
            })
            this.props.initDataPdf({index: index})
        }
        if (index < n && 1 < n && index < 1) {
            this.props.initDataPdf({index: index})
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            pdfData: this.props.Pdf.pdfData,
        })
    }
    openModal = (type,shareid) => {
        console.log(type)
        if (type == "photo" || type === "photo") {
            this.setState({
                visiably: false
            })
        } else if (type == "software" || type === "software") {
            console.log(systemid)
            console.log(this.props.history.push)
            this.props.history.push(`/software/?id=${systemid}`)
        } else if (type == 'pdf' || type === "pdf") {
          window.open('/#/pdf?shareid='+shareid, '_blank');
        } else if (type == 'live' || type === "live") {
            this.props.history.push(`/live/?id=${systemid}`)
        }
    }
    openDataPdf = (shareid) => {
        console.log(shareid)
        openDataPdfRequest({shareid:shareid})
            .then(res=>{
                console.log(res)
                window.open('/#/pdf?data='+res.content, '_blank');
            })
    }
    render() {
        const {visiably,pdfData} = this.state;
        return (
            <Fragment>
                <section className='cont3'>
                    <section className='modal line'>
                        <div className='container'>
                            <p className="Header">
                                <h3>单品推荐</h3>
                                <div>
                                    <span>种类：</span>
                                    <Link to="/social/singlep">全部</Link>
                                    <Link to="/social/singlep/live">生活</Link>
                                    <Link to="/social/singlep/software">软件</Link>
                                    <Link to="/social/singlep/pdf">论文</Link>
                                    <Link to="/social/singlep/photo">照片</Link>
                                </div>
                            </p>
                            <div className="Content">
                                <ul>
                                    {Object.keys(pdfData).length?pdfData.map(item=>{
                                        return (
                                            <SingleP 
                                                openModal={this.openModal} 
                                                type="pdf" 
                                                title={item.filename} 
                                                num={1125} 
                                                img={item.bc?item.bc:common.mainImg8.default} 
                                                shareid={item.shareid} 
                                                openDataPdf={this.openDataPdf}
                                            />
                                        )
                                    }):''}
                                </ul>
                            </div>
                        </div>
                    </section>
                </section>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Pdf: state.Social
    }
}

export default connect(mapStateToProps, {
    initDataPdf,
})(withRouter(singlepPD));