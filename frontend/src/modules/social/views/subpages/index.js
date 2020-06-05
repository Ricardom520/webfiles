import React , {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import '../social.less';
import {common, icon} from '../../../../images';
import SingleP from '../../../../components/SingleP';
import ContentS from '../../../../components/ContentS';
import RecomBP from '../../../../components/RecomBP';
import Photos from '../../../../components/Photos';
import {
    initSocialnrjx,
    initSocialdptj,
} from '../../models/social';
import {
  openDataPdfRequest,
  openDataPicRequest,
} from '../../services';
const pdful = require('../染色体.pdf');

class SocialIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiably: true,
            pics: [],
            nrjx: [],
            dptj: [],
        }
    }
    componentDidMount() {
        this.props.initSocialnrjx(); // 初始化内容精选
        this.props.initSocialdptj(); // 初始化单品推荐
    }
    openModal = (type,systemid) => {
        console.log(type)
        console.log(systemid)
        if (type == "photo" || type === "photo") {
          openDataPicRequest({shareid:systemid})
                .then(res=>{
                    console.log(res)
                    this.setState({
                        filename: res.filename,
                        disc: res.disc,
                        pics: res.content
                    })
                })
            this.setState({
                visiably: false
            })
        } else if (type == "software" || type === "software") {
            console.log(systemid)
            console.log(this.props.history.push)
            this.props.history.push(`/software/?id=${systemid}`)
        } else if (type == 'pdf' || type === "pdf") {
            window.open('/#/pdf?shareid='+systemid, '_blank');
        } else if (type == 'live' || type === "live") {
            this.props.history.push(`/live/?id=${systemid}`)
        }
    }
    hideModal = () => {
        this.setState({
            visiably: true
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            nrjx: this.props.socials.nrjxData,
            dptj: this.props.socials.dptjData
        })
    }
    render() {
        const {visiably,pics,nrjx,dptj} = this.state;
        return (
            <Fragment>
                <section className='cont2'>
                    <section className='modal line'>
                        <div className='container'>
                            <p className="Header">
                                <h3>内容精选</h3>
                                <Link to="/social/contents">往期精选></Link>
                            </p>
                            <div className="Content">
                                <ul>
                                    {
                                        Object.keys(nrjx).length? nrjx.map(item=>{
                                          console.log(item)
                                            return (
                                                <ContentS 
                                                  openModal={this.openModal} 
                                                  img={item.bc?item.bc:common.mainImg4.default} 
                                                  title={item.filename} 
                                                  time={item.sharetime}
                                                  fav={item.fav} 
                                                  writer="Ricardom" 
                                                  like={item.liked}
                                                  type={item.filetype}
                                                  shareid={item.shareid}
                                                />
                                            )
                                        }):''
                                    }
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
                            <div className="Content">
                                <ul>
                                  {
                                    Object.keys(dptj).length ? dptj.map(item => {
                                      return (
                                        <SingleP openModal={this.openModal} type={item.filetype} title={item.filename} num={1125} img={item.bc} shareid={item.shareid}/>
                                      )
                                    }):''
                                  }
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
                            <div className="Content">
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
                <Photos visiably={visiably} hideModal={this.hideModal} pics={pics}/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        socials: state.Social
    }
}

export default connect(mapStateToProps, {
    initSocialnrjx,
    initSocialdptj,
})(withRouter(SocialIndex));