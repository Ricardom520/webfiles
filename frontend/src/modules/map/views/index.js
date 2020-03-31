import React , {Component} from 'react';
import { Layout, Menu, Button, Form, Input } from 'antd';
import {Link} from 'react-router-dom';
const { Header, Content, Footer } = Layout;
import './map.less';

class Map extends Component {
    componentDidMount() {
        this.renderMap();
    }
    renderMap() {
        let map=new window.BMap.Map("orderDetailMap"); //初始化地图，这个id和下面的id相对应，之所以将初始化的地图放到this对象上，是方便其他方法调用map对象
        map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
        map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
        map.enableScrollWheelZoom(); //启用滚轮放大缩小
        map.setMapStyle({ style: "mapbox" });
        console.log("激动了")
        // 获取当前位置
        let geolocation = new BMap.Geolocation();
        geolocation.enableSDKLocation();
        geolocation.getCurrentPosition(function(r) {
            console.log(r)
            let mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            let pt = r.point;   
            map.panTo(pt);//移动地图中心点
            map.centerAndZoom(new BMap.Point(r.point.lng,r.point.lat), 20);
        })
    }

    render() {
        return (
            <div className="mapContainer">
                <Header>
                    <Link to="/explorer/files" style={{overflow: 'hidden'}}>
                        <h3 style={{color:'#fff'}}>
                            科技让出行更简单
                        </h3>
                    </Link>
                    <Content>
                        {/*<Form>
                            <input type="search" placeholder="find more..." ref={search=>this.search=search}/>
                            <button onClick={()=>this.find()}>搜索</button>
                        </Form>*/}
                    </Content>
                </Header>
                <div id="orderDetailMap" className="orderDetailMap">

                </div>
            </div>
        );
    }
}

export default Map;