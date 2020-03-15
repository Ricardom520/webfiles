import React , {Component, Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../social.less';
import {common, icon} from '../../../../images';
import SingleP from '../../../../components/SingleP';
import ContentS from '../../../../components/ContentS';
import RecomBP from '../../../../components/RecomBP';
import Photos from '../../../../components/Photos';
const pdful = require('../染色体.pdf');

class recombp extends Component {
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
                <section className='cont4'>
                    <section className='modal line'>
                        <div className='container'>
                            <p className="header">
                                <h3>达人推荐</h3>
                                <Link>更多达人></Link>
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

export default withRouter(recombp);