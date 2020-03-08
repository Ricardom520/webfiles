import React , {Component, Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../social.less';
import {common, icon} from '../../../../images';
import SingleP from '../../../../components/SingleP';
import ContentS from '../../../../components/ContentS';
import RecomBP from '../../../../components/RecomBP';
import Photos from '../../../../components/Photos';
const pdful = require('../07染色体数目变异20191011-12.pdf');

class singlepPD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiably: true
        }
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
        const {visiably} = this.state;
        return (
            <Fragment>
                <section className='cont3'>
                    <section className='modal line'>
                        <div className='container'>
                            <p className="header">
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
                            <div className="content">
                                <ul>
                                    <SingleP openModal={this.openModal} type="photo" title="广师铁板烧" num={1125} img={common.mainImg6.default} systemid="ph46782"/>
                                    <SingleP openModal={this.openModal} type="software" title="交友软件" num={1125} img={common.mainImg7.default} systemid="s43572"/>
                                    <SingleP openModal={this.openModal} type="pdf" title="07染色体数目变异" num={1125} img={common.mainImg8.default} systemid="pd4156477"/>
                                    <SingleP openModal={this.openModal} type="live" title="被骂“滚出娱乐圈”的她，如今却成为白富美，走上人生巅峰" num={1125} img={common.mainImg9.default}/>
                                    <SingleP openModal={this.openModal} type="software" title="夹克" num={1125} img={common.mainImg10.default} systemid="l232"/>
                                </ul>
                            </div>
                        </div>
                    </section>
                </section>
                <Photos visiably={visiably} hideModal={this.hideModal}/>
            </Fragment>
        )
    }
}

export default withRouter(singlepPD);