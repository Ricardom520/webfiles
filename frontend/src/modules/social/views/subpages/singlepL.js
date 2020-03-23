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
    initDataLive
} from '../../models/social';
const pdful = require('../染色体.pdf');

class singlepL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiably: true,
            liveData: [],
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
        console.log(scrollTop)
        if (90 < scrollTop && scrollTop < 300) {
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
            this.props.initDataLive({index: index})
        }
        if (index < n && 1 < n && index < 1) {
            this.props.initDataLive({index: index})
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            liveData: this.props.singlepL.liveData,
        })
    }
    openModal = (type,systemid) => {
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
            console.log(pdful)
            window.open(pdful.default, '_blank');
        } else if (type == 'live' || type === "live") {
            this.props.history.push(`/live/?id=${systemid}`)
        }
    }
    hideModal = () => {
        this.setState({
            visiably: true
        })
    }
    render() {
        const {visiably,liveData} = this.state;
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
                                    {
                                        Object.keys(liveData).length?liveData.map(item=>{
                                            return (
                                                <SingleP openModal={this.openModal} type="live" title={item.filename} num={1125} img={item.bc} shareid={item.shareid}/>
                                            )
                                        }):''
                                    }
                                </ul>
                            </div>
                        </div>
                    </section>
                </section>
            </Fragment>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        singlepL: state.Social
    }
}

export default connect(mapStateToProps,{
    initDataLive,
})(withRouter(singlepL));