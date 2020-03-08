import React , {Component} from 'react';
import { Route, Switch, HashRouter as Router, Link,withRouter,Redirect } from 'react-router-dom';
import './social.less';
import {common, icon} from '../../../images';
import SocialHeader from '../../../components/SocialHeader';
import SocialIndex from './subpages';
import ContentS from './subpages/contentS';
import RecomBP from './subpages/recomBP';
import SingleP from './subpages/singlep';
import SinglePL from './subpages/singlepL';
import SinglePS from './subpages/singlepS';
import SinglePPD from './subpages/singlepPD';
import SinglePPH from './subpages/singlepPH';
const pdful = require('./07染色体数目变异20191011-12.pdf');

class Social extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: '',
            currentIndex: 1,
            visiably: true
        }
    }

    componentDidMount() {
        console.log(this)
        this.slideInit()
    }

    slideInit() {
        let slide = document.querySelector('.slideContainer');
        let width = slide.childNodes[0].offsetWidth;
        let firstDom = slide.firstElementChild.cloneNode(true);
        let lastDom = slide.lastElementChild.cloneNode(true);
        slide.appendChild(firstDom);
        slide.insertBefore(lastDom,slide.firstElementChild);
        slide.style.left = -width+'px';
        let everyTime = 3000
        this.autoPlay(everyTime);
    }
    criticality = (boundary, flag) => {
        let slide = document.querySelector('.slideContainer');
        let width = slide.childNodes[0].offsetWidth;
        let currentIndex = this.state.currentIndex;
        this.play(-(width*currentIndex),boundary);

        setTimeout(function() {
            slide.style.left = -width*boundary + 'px';
            slide.style.transition = 'left 0s';
            console.log(slide.style.left)
        }, 1500);
        this.setState({
            currentIndex: boundary
        })
    }
    play = (left, activeIndex) => {
        let slide = document.querySelector('.slideContainer');
        slide.style.left = left + 'px';
        slide.style.transition = 'left 1.5s';
    }
    autoPlay = (period) => {
        let timer = this.state.timer;
        let currentIndex = this.state.currentIndex;
        let slide = document.querySelector('.slideContainer');
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
    stopSlides() {
        let timer = this.state.timer;
        clearInterval(timer)
        this.setState({
            tiemr: null
        })
    }
    playSlides() {
        this.autoPlay(3000);
    }
    trunLeft(left) {
        let currentIndex = this.state.currentIndex;
        if (currentIndex >= 1) {
            let slide = document.querySelector('.slideContainer');
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
            let slide = document.querySelector('.slideContainer');
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
        return (
            <div className='socialContainer'>
                <SocialHeader/>
                <section className='cont1'>
                    <section className='modal line'>
                        <div className='slides' ref={slides=>this.slides=slides} onMouseEnter={()=>this.stopSlides()} onMouseLeave={()=>this.playSlides()}>
                            <div className='slideContainer'>
                                <Link>
                                    <img src={common.slide1.default}></img>
                                </Link>
                                <Link>
                                    <img src={common.slide2.default}></img>
                                </Link>
                                <Link>
                                    <img src={common.slide3.default}></img>
                                </Link>
                                <Link>
                                    <img src={common.slide4.default}></img>
                                </Link>
                                <Link>
                                    <img src={common.slide5.default}></img>
                                </Link>
                            </div>
                            <div className='leRi'>
                                <ul>
                                    <li className='left' onClick={()=>this.trunLeft(780)}></li>
                                    <li className='right' onClick={()=>this.trunRight(780)}></li>
                                </ul>
                            </div>
                        </div>
                        <div className='menu'>
                            <ul>
                                <p>社区热点</p>
                                <li>
                                    <span className="index NO1">1&nbsp;</span><Link>走进科学</Link><span className="num">555万</span>
                                </li>
                                <li>
                                    <span className="index NO2">2&nbsp;</span><Link>走进科学</Link><span className="num">480万</span>
                                </li>
                                <li>
                                    <span className="index NO3">3&nbsp;</span><Link>走进科学</Link><span className="num">344万</span>
                                </li>
                                <li>
                                    <span className="index">4&nbsp;</span><Link>走进科学</Link><span className="new">新</span><span className="num">268万</span>
                                </li>
                                <li>
                                    <span className="index">5&nbsp;</span><Link>走进科学</Link><span className="num">193万</span>
                                </li>
                                <li>
                                    <span className="index">6&nbsp;</span><Link>走进科学</Link><span className="num">182万</span>
                                </li>
                                <li>
                                    <span className="index">7&nbsp;</span><Link>走进科学</Link><span className="num">157万</span>
                                </li>
                                <li>
                                    <span className="index">8&nbsp;</span><Link>走进科学</Link><span className="num">137万</span>
                                </li>
                                <li>
                                    <span className="index">9&nbsp;</span><Link>走进科学</Link><span className="num">130万</span>
                                </li>
                                <li>
                                    <span className="index">10</span><Link>走进科学</Link><span className="num">121万</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </section>
                <div>
                    <Router>
                        <Switch>
                            <Route path="/social/contents" component={ContentS}/>
                            <Route path="/social/recombp" component={RecomBP}/>
                            <Route path="/social/singlep/live" component={SinglePL}/>
                            <Route path="/social/singlep/software" component={SinglePS}/>
                            <Route path="/social/singlep/pdf" component={SinglePPD}/>
                            <Route path="/social/singlep/photo" component={SinglePPH}/>
                            <Route path="/social/singlep" component={SingleP}/>
                            <Route path="/social" component={SocialIndex} />
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default withRouter(Social);