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
            length: 0,
            width: 0,
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
        console.log(currentIndex)
        if (currentIndex > 1) {
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
        console.log("右击了")
        let currentIndex = this.state.currentIndex;
        let length = this.state.length;
        console.log(length)
        console.log(currentIndex)
        if (currentIndex < length) {
            console.log("huagong ; ")
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
    componentWillReceiveProps(nextProps) {
        let length = Object.keys(nextProps.pics).length;
        let slide = this.slide;
        this.setState({
            length: length,
            width: length * 780 + 'px'
        })
        slide.style.width = length * 780 + 'px';
    }
    hideModal () {
        let slide = this.slide;
        slide.style.left = '0px';
        this.setState({
            timer: '',
            currentIndex: 1,
            length: 0,
            width: 0,
        })
        this.props.hideModal();
    }
    render() {
        const {visiably,hideModal,filename,disc,pics,width} = this.props;
        return (
            <div className="PhotosContainer" style={visiably?{display: 'none'}: {display:'block'}}>
                <div className='slides' ref={slides=>this.slides=slides}>
                    <div className='slideContainerPhotos' style={{left: '0px',width: width}} ref={slide=>this.slide=slide}>
                        {
                            Object.keys(pics).length?pics.map(item=>{
                                return (
                                    <a>
                                        <img src={item.pic}></img>
                                    </a>
                                )
                            }):''
                        }
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
                    <h3>{filename}</h3>
                    <p>
                        {disc}
                    </p>
                </div>
                <div className="close">
                    <button onClick={()=>this.hideModal()}>X</button>
                </div>
            </div>
        )
    }
}

export default Photos;