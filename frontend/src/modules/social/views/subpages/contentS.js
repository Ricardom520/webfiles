import React , {Component, Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../social.less';
import {common, icon} from '../../../../images';
import SingleP from '../../../../components/SingleP';
import ContentS from '../../../../components/ContentS';
import RecomBP from '../../../../components/RecomBP';
import Photos from '../../../../components/Photos';
const pdful = require('../07染色体数目变异20191011-12.pdf');

class contentS extends Component {
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
                            <p className="header">
                                <h3>内容精选</h3>
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
                <Photos visiably={visiably} hideModal={this.hideModal}/>
            </Fragment>
        )
    }
}

export default withRouter(contentS);