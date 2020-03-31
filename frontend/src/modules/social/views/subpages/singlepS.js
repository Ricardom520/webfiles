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
    initDataSoftware,
    clearSoftData,
} from '../../models/social';

class singlepS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiably: true,
            softData: [],
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
            this.props.initDataSoftware({index: index})
        }
        if (index < n && 1 < n && index < 1) {
            this.props.initDataSoftware({index: index})
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            softData: this.props.softs.softData,
        })
    }
    openModal = (type,systemid) => {
        if (type == "software" || type === "software") {
            this.props.history.push(`/software/?id=${systemid}`)
            this.props.clearSoftData();
        }
    }
    hideModal = () => {
        this.setState({
            visiably: true
        })
    }
    render() {
        console.log(this.state.index)
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
    clearSoftData,
})(withRouter(singlepS));