import React , {Component, Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../social.less';
import {common, icon} from '../../../../images';
import SingleP from '../../../../components/SingleP';
import ContentS from '../../../../components/ContentS';
import RecomBP from '../../../../components/RecomBP';
import Photos from '../../../../components/Photos';
const pdful = require('../07染色体数目变异20191011-12.pdf');

class SocialIndex extends Component {
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
                <section className='cont2'>
                    <section className='modal line'>
                        <div className='container'>
                            <p className="Header">
                                <h3>内容精选</h3>
                                <Link to="/social/contents">往期精选></Link>
                            </p>
                            <div className="content">
                                <ul>
                                    <ContentS img={common.mainImg1.default} title="你的书写工具需要一个庇护所" time="2020.1.8" fav="2255" writer="Ricardom" like="1250"/>
                                    <ContentS img={common.mainImg2.default} title="你的书写工具需要一个庇护所" time="2020.1.8" fav="2255" writer="Ricardom" like="1250"/>
                                    <ContentS img={common.mainImg3.default} title="你的书写工具需要一个庇护所" time="2020.1.8" fav="2255" writer="Ricardom" like="1250"/>
                                    <ContentS img={common.mainImg4.default} title="你的书写工具需要一个庇护所" time="2020.1.8" fav="2255" writer="Ricardom" like="1250"/>
                                    <ContentS img={common.mainImg5.default} title="你的书写工具需要一个庇护所" time="2020.1.8" fav="2255" writer="Ricardom" like="1250"/>
                                </ul>
                            </div>
                        </div>
                    </section>
                </section>
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
                <section className='cont4'>
                    <section className='modal line'>
                        <div className='container'>
                            <p className="Header">
                                <h3>达人推荐</h3>
                                <Link to="/social/recombp">更多达人></Link>
                            </p>
                            <div className="content">
                                <ul>
                                    <RecomBP userImg={common.userImg1.default} headImg={common.headImg1.default} name="虽虽酱" img={common.favorites.default} num="9465" good="Q版"/>
                                    <RecomBP userImg={common.userImg2.default} headImg={common.headImg2.default} name="虽虽酱" img={common.favorites.default} num="9465" good="Q版"/>
                                    <RecomBP userImg={common.userImg3.default} headImg={common.headImg3.default} name="虽虽酱" img={common.favorites.default} num="9465" good="Q版"/>
                                    <RecomBP userImg={common.userImg4.default} headImg={common.headImg4.default} name="虽虽酱" img={common.favorites.default} num="9465" good="Q版"/>
                                    <RecomBP userImg={common.userImg5.default} headImg={common.headImg5.default} name="虽虽酱" img={common.favorites.default} num="9465" good="Q版"/>
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

export default withRouter(SocialIndex);