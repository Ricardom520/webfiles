import React, {Component} from 'react';
import Explorer from './modules/explorer/views';
import Map from './modules/map/views';
import Find from './modules/find/views';
import Social from './modules/social/views';
import './app.less';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0
        }
    }

    componentDidMount() {
        this.boxInit();
    }

    boxInit() {
        console.log(this.box);
        let box = this.box;
        let Pages = box.children;
        console.log(Pages);
        let deg = 360 / Pages.length;
        let roY = 0;
        let x,y,x_y_,xN,yN,time = null;
        
        let page = this.state.page;

        for (let i = 0; i < Pages.length; i++) {
            Pages[i].style.transition = 'all 1s' + (Pages.length - i -1) * .1 + 's';
            if (page === i) {
                Pages[i].style.transform = 'rotateY(' + i*deg + 'deg)';
            } else {
                Pages[i].style.transform = 'rotateY(' + i*deg + 'deg) scale(0)'; 
            }
            Pages[i].ondragstart = function() {
                return false;
            }
        }
    }

    boxMousedowm(e) {
        console.log("安")
        console.log(e)
        console.log(this)
        const {page} = this.state;
        const that = this;
        e = e || window.event;
        let x, y, x_, y_, xN, yN, box, roX,roY, Pages, deg;
        roX = -10;
        roY = 0;
        box = this.box;
        Pages = box.children;
        deg = 360 / Pages.length;
        x_ = e.clientX;
        y_ = e.clientY;

        let num = 0;
        let timer = setInterval(function() {
            num += 1;

            if (num === 1) {
                box.style.width = '400px';
                box.style.height = '200px';
                box.style.transform = 'perspective(800px) rotateX(-15deg) rotateY('+roY+'deg)';
                box.style.margin = '100px auto';
            
                for (let i = 0; i < Pages.length; i++) {
                    Pages[i].style.transition = 'all ease-in-out 1s';
                    Pages[i].style.transform = 'scale(1) rotateY('+ i*deg + 'deg) translateZ(350px)';
                }

                box.onmousemove = function(e) {
                    e = e || window.event;
                    x = e.clientX;
                    y = e.clientY;
                    xN = x - x_;
                    yN = y - y_;
                    roY += xN * .2;
                    roX -= yN * .2;
                    console.log(roX)
                    console.log(box)
                    box.style.transform = 'prespective(800px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';
                    x_ = e.clientX;
                    y_ = e.clientY;
                    console.log("移动了")
                }

                box.onmouseup = function(e) {
                    clearInterval(timer);
                    box.onmousemove = null;
                    box.style.width = '100%';
                    box.style.height = '100%';
                    box.style.margin = '0px';
                    box.style.transition = 'all ease-in-out 1s';
                    for (let i = 0; i < Pages.length; i++) {
                        if (page == i) {
                            Pages[i].style.transform = 'rotateY(' + i*deg + 'deg) translateZ(0px)';
                        } else {
                            console.log(Pages[i])
                            Pages[i].style.transform = 'rotateY(' + i*deg + 'deg) scale(0)'; 
                            console.log(Pages[i])
                        }
                    }
                    console.log(roY)
                    console.log(Pages)

                    new Promise(function(resolve, reject) {
                        console.log(this)
                        console.log(roY)
                        console.log(that)
                        console.log(resolve)
                        roY = that.choose(roY);
                        res();
                    }).then(function(result) {
                        console.log(result)
                        that.hide(result);
                    })
                }
            }
        }, 1000)
        box.onmouseup = function() {
            clearInterval(timer);
        }
    }

    choose(roY) {
        let box = this.box;
        let Pages = box.children;
        console.log(Pages);
        let deg = 360 / Pages.length;
        //let roY = 0;
        //let x,y,x_y_,xN,yN,time = null;

        for (let i = 0; i < Pages.length; i++) {
            //Pages[i].style.transition = 'all ease-in-out 1s';
            Pages[i].style.transform = 'rotateY('+ i*deg + 'deg)';
        }
        
        // 判断圈数
        if (roY > 360 || roY < -360) {
            roY = roY%360;
        }

        // 黄色
        if (-135<=roY && roY < -45) {
            box.style.transform = 'perspective(800px) rotateX(0deg) rotateY(-90deg)';
            roY = -90;
        }
        if (225<=roY && roY < 315) {
            box.style.transform = 'perspective(800px) rotateX(0deg) rotateY(270deg)';
            roY = 270;
        }
        // 蓝色
        if (-225<= roY && roY < -135) {
            box.style.transform = 'perspective(800px) rotateX(0deg) rotateY(-180deg)';
            roY = -180;
        }
        if (135<=roY && roY<225) {
            box.style.transform = 'perspective(800px) rotateX(0deg) rotateY(180deg)';
            roY = 180;
        }
        // 绿色
        if (-315<= roY && roY < -225) {
            box.style.transform = 'perspective(800px) rotateX(0deg) rotateY(-270deg)';
            roY = -270;
        }
        if (45<=roY && roY < 135) {
            box.style.transform = 'perspective(800px) rotateX(0deg) rotateY(90deg)';
            roY = 90;
        }
        // 红色
        if (-45<= roY && roY < 45) {
            box.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
            roY = 0;
        }
        if (315<=roY && roY<=360) {
            box.style.transform = 'perspective(800px) rotateX(0deg) rotateY(360deg)';
            roY = 0;
        }
        if (-360<=roY && roY<-315) {
            box.style.transform = 'perspective(800px) rotateX(0deg) rotateY(-360deg)';
            roY = 0;
        }
        //box.style.transform = 'perspective(800px) rotateX(0deg) rotateY('+roY+'deg)';
        box.style.transition = 'all ease-in-out 1s';
        console.log(roY)
        return roY
    }

    hide(roY) {
        let page = this.state.page;
        let box = this.box;
        let Pages = box.children;
        console.log(Pages);
        console.log(page)
        console.log(roY)
        //let deg = 360 / Pages.length;
        if (roY === 0) {
            page = 0;
            for(let i = 0; i < Pages.length; i++){
                if (i === page) {
                    continue;
                } else {
                    Pages[i].style.transform = 'scale(0)';
                }
            }
        }
        if (roY === 90 || roY === -270) {
            page = 3;
            for(let i = 0; i < Pages.length; i++){
                if (i === page) {
                    continue;
                } else {
                    Pages[i].style.transform = 'scale(0)';
                }
            }
        }
        if (roY === 180 || roY === -180) {
            page = 2;
            for(let i = 0; i < Pages.length; i++){
                if (i === page) {
                    continue;
                } else {
                    Pages[i].style.transform = 'scale(0)';
                }
            }
        }
        if (roY === -90 || roY === 270) {
            page = 1;
            for(let i = 0; i < Pages.length; i++){
                if (i === page) {
                    continue;
                } else {
                    Pages[i].style.transform = 'scale(0)';
                }
            }
        }
        this.setState({
            page: page
        })
    }

    render() {
        return (
            <div className='Container' ref={box=>this.box = box} onMouseDown={(e)=>this.boxMousedowm(e)}>
                <Explorer/>
                <Map />
                <Find />
                <Social />
            </div>
        );
    }
}

export default App;