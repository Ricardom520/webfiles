import React , {Component, Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import '../social.less';
import {common, icon} from '../../../../images';
import SingleP from '../../../../components/SingleP';
import ContentS from '../../../../components/ContentS';
import RecomBP from '../../../../components/RecomBP';
import Photos from '../../../../components/Photos';
const pdful = require('../染色体.pdf');
import {
    initDataSoftware
} from '../../models/social';

class singlepS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiably: true,
            softData: [],
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
        if (index < n && 1 <= n) {
            this.props.initDataSoftware({index: index})
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            softData: this.props.softs.softData,
        })
    }
    openModal = (type,systemid) => {
        if (type == "photo" || type === "photo") {
            this.setState({
                visiably: false
            })
        } else if (type == "software" || type === "software") {
            this.props.history.push(`/software/?id=${systemid}`)
        } else if (type == 'pdf' || type === "pdf") {
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
        const {visiably,softData} = this.state;
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
                                        Object.keys(softData).length?softData.map(item=>{
                                            return (
                                                <SingleP openModal={this.openModal} type="software" title={item.filename} num={1125} img={item.bc} shareid={item.shareid}/>
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
    console.log(state)
    return {
        softs: state.Social
    }
}

export default connect(mapStateToProps,{
    initDataSoftware,
})(withRouter(singlepS));