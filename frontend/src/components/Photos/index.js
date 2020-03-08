import React,{Component} from 'react';
import {common, icon} from '../../images';
import Like from '../Like';
import './Photos.less';

class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: '',
            currentIndex: 1,
        }
    }

    componentDidMount() {
        console.log(this)
    }
    criticality = (boundary, flag) => {
        let slide = document.querySelector('.slideContainerPhotos');
        let width = slide.childNodes[0].offsetWidth;
        let currentIndex = this.state.currentIndex;
        this.play(-(width*currentIndex),boundary);

        setTimeout(function() {
            slide.style.left = -width*boundary + 'px';
            slide.style.transition = 'left 0s';
        }, 1500);
        this.setState({
            currentIndex: boundary
        })
    }
    play = (left, activeIndex) => {
        let slide = document.querySelector('.slideContainerPhotos');
        slide.style.left = left + 'px';
        slide.style.transition = 'left 1.5s';
    }
    autoPlay = (period) => {
        let timer = this.state.timer;
        let currentIndex = this.state.currentIndex;
        let slide = document.querySelector('.slideContainerPhotos');
        let slideLength = slide.childNodes.length;
        let width = slide.childNodes[0].offsetWidth;
        let that = this;
        timer = setInterval(function() {
            currentIndex++;
            that.setState({
                currentIndex: currentIndex
            })
            if (currentIndex == slideLength - 1) {
                clearInterval(timer);
                that.criticality(1);
                return that.autoPlay(period);
            } else {
                if (currentIndex < slideLength - 1) {
                    that.play(-(width * currentIndex),currentIndex);
                }
            }
        }, period)
        this.setState({
            timer: timer
        })
    }
    trunLeft(left) {
        let currentIndex = this.state.currentIndex;
        if (currentIndex >= 1) {
            let slide = document.querySelector('.slideContainerPhotos');
            let slideLeft = slide.style.left;
            slide.style.left = parseInt(slideLeft) + left + 'px';
            slide.style.transition = 'left 1.5s';
            currentIndex--;
            this.setState({
                currentIndex: currentIndex
            })
        } else {
            return
        }
    }
    trunRight(right) {
        let currentIndex = this.state.currentIndex;
        if (currentIndex <= 5) {
            let slide = document.querySelector('.slideContainerPhotos');
            let slideLeft = slide.style.left;
            slide.style.left = parseInt(slideLeft) - right + 'px';
            slide.style.transition = 'left 1.5s';
            currentIndex++;
            this.setState({
                currentIndex: currentIndex
            })
        }
    }
    render() {
        const {visiably,hideModal} = this.props;
        return (
            <div className="PhotosContainer" style={visiably?{display: 'none'}: {display:'block'}}>
                <div className='slides' ref={slides=>this.slides=slides}>
                    <div className='slideContainerPhotos' style={{left: '0px'}}>
                        <a>
                            <img src={common.slide1.default}></img>
                        </a>
                        <a>
                            <img src={common.slide2.default}></img>
                        </a>
                        <a>
                            <img src={common.slide3.default}></img>
                        </a>
                        <a>
                            <img src={common.slide4.default}></img>
                        </a>
                        <a>
                            <img src={common.slide5.default}></img>
                        </a>
                    </div>
                    <div className='leRi'>
                        <ul>
                            <li className='left' onClick={()=>this.trunLeft(780)}></li>
                            <li className='right' onClick={()=>this.trunRight(780)}></li>
                        </ul>
                    </div>
                </div>
                <div className='likeContainer'>
                    <Like/>
                </div>
                <div className='disc'>
                    <h3>广师铁板烧</h3>
                    <p>
                        这里环境优美，值得推荐哈哈哈哈哈哈哈哈哈
                    </p>
                </div>
                <div className="close">
                    <button onClick={hideModal}>X</button>
                </div>
            </div>
        )
    }
}

export default Photos;