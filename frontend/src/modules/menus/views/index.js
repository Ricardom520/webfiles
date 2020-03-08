import React, {Component,Fragment, Children} from 'react';
import { Route, Switch, HashRouter as Router, Link,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Frame from '../../../components/Frame';
import Files from '../../files/views';
import Editor from '../../editor/views';
import './menus.less';
import { icon, common } from '../../../images/index';
import Myfiles from '../../files/views/subpages/myfiles';
import {
    initMyfie
} from '../models/menus';

class Menus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentid: 'myfile'
        }
    }
    onContextMenu(e) {
        console.log(e.target.classList)
        let lis = this.right2.getElementsByTagName('li');
        let ps = this.right2.getElementsByTagName('P');
        console.log(lis)
        let target = e.target;
        for (let k = 0; k< ps.length; k++) {
            ps[k].classList.remove('active');
        }
        for (let j = 0; j< lis.length; j++) {
            lis[j].classList.remove('active');
        }
        if (target.className == 'active') {
            target.classList.remove('active');
        } else {
            target.classList.add('active');
        }
        console.log(target)
        let frame = target.getElementsByClassName('frameContainer');
        console.log(frame[0])
        if (frame[0]) {
            let status = frame[0].style.display;
            let frames = document.getElementsByClassName('frameContainer')
            for (let i = 0; i < frames.length; i++) {
                frames[i].style.display = 'none';
            }
            if (status == 'none' || status === 'none') {
                frame[0].style.display =  'block';
            } else {
                frame[0].style.display =  'none';
            }
        }
        
        
        console.log(frames)
        console.log(this)
        console.log(e)
        e.preventDefault();
        console.log("右击了")
        return false;
    }
    ContextRight2Click(e,url) {
        console.log(url)
        console.log(e.target.classList)
        let lis = this.right2.getElementsByTagName('li');
        let ps = this.right2.getElementsByTagName('P');
        let frames = document.getElementsByClassName('frameContainer');
        console.log(lis)
        let target = e.target;
        for (let i = 0; i< frames.length; i++) {
            frames[i].style.display="none";
        }
        for (let k = 0; k< ps.length; k++) {
            ps[k].classList.remove('active');
        }
        for (let j = 0; j< lis.length; j++) {
            lis[j].classList.remove('active');
        }
        if (target.className == 'active') {
            target.classList.remove('active');
        } else {
            console.log("进来了")
            console.log(target)
            target.classList.add('active');
        }
        this.props.history.push(`/explorer/files/${url}`);
    }
    ContextRight2PClick(e,url) {
        console.log(e.target.classList)
        let lis = this.right2.getElementsByTagName('li');
        let ps = this.right2.getElementsByTagName('P');
        console.log(lis)
        console.log(e.target)
        let target = e.target;
        let targetLi = target.getElementsByTagName('li');
        for (let k = 0; k< ps.length; k++) {
            ps[k].classList.remove('active');
        }
        console.log(e.target.classList.value)
        target.classList.add('active');
        this.props.history.push(`/explorer/files/${url}`);
    }
    initMenus() {
        let userid = sessionStorage.getItem('userid');
        let parentid = this.state.parentid;
        this.props.initMyfie({userid: userid, parentid: parentid})
    }
    initMenusMyfile(arr) {
        return (<ul>
            {
                arr.map(item=>{
                    return (
                        <li>
                            <Link>
                                <img src={common.file.default}></img>{item.filename}
                            </Link>
                            {item.children?this.initMenusMyfile(item.children):''}
                        </li>
                    )
                })
            }
        </ul>)
    }
    render() {
        const base1 = [
            {
                img: `${icon.refresh.default}`,
                title: `刷新树目录`,
                span: 'E',
            },
            {
                img: `${icon.openFile.default}`,
                title: `打开`,
                span: 'O',
                label: 'Enter'
            }
        ]
        const base2 = [
            {
                img: `${icon.refresh.default}`,
                title: `刷新树目录`,
                span: 'E',
            },
            {
                img: `${common.file.default}`,
                title: '管理目录',
                span: 'V'
            },
            {
                img: `${icon.copy.default}`,
                title: '粘贴',
                span: 'P',
                label: 'Ctrl+V'
            },
            {
                img: `${common.file.default}`,
                title: '新建文件夹',
                span: 'N',
                label: 'Alt+M'
            },
            {
                img: `${icon.favorited.default}`,
                title: '添加到收藏夹',
                span: 'F',
            },
            {
                img: `${icon.find.default}`,
                title: '在文件夹中搜索',
                span: 'S',
            },
        ]
        const base3 = [
            {
                img: `${icon.openFile.default}`,
                title: `打开`,
                span: 'O',
                label: 'Enter'
            }
        ]
        const base4 = [
            {
                img: `${icon.overlapping.default}`,
                title: `清空回收站`,
                span: 'C',
            },
            {
                img: `${icon.openFile.default}`,
                title: `打开`,
                span: 'O',
                label: 'Enter'
            }
        ]
        let {myfileData} = this.props.menus;
        return (
            <Fragment>
                <div className='right2' ref={right2=>this.right2=right2}>
                    <ul className="positionLists">
                        <p onContextMenu={(e)=>this.onContextMenu(e)} style={{cursor:'pointer',position: 'relative'}} id="position" onClick={(e)=>this.ContextRight2PClick(e,'position')}>
                            位置
                            <Frame listsData={base1}/>
                        </p>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="favorite" onClick={(e)=>this.ContextRight2Click(e,'favorite')}>
                            <img src={icon.favorites2.default} style={{width: '14px'}}></img>
                            收藏夹
                            <Frame listsData={base1}/>
                        </li>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="myFiles" onClick={(e)=>this.ContextRight2Click(e,'myfile')} onDoubleClick={()=>this.initMenus()}>
                            <img src={icon.house.default}></img>
                            我的文档
                            <Frame listsData={base2}/>
                        </li>
                        {myfileData?myfileData.map(item=>{
                            return (
                                <ul className="childmenus">
                                    <li>
                                        <Link><img src={common.file.default}></img>{item.filename}</Link>
                                        {item.children?this.initMenusMyfile(item.children):''}
                                    </li>
                                </ul>
                            )
                        }):''}
                    </ul>
                    <ul className="toolLists">
                        <p style={{cursor:'pointer'}} onContextMenu={(e)=>this.onContextMenu(e)} id="tool" onClick={(e)=>this.ContextRight2PClick(e,'tool')}>
                            工具
                            <Frame listsData={base1}/>
                        </p>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="nearFile" onClick={(e)=>this.ContextRight2Click(e,'nearfile')}>
                            <img src={icon.time.default}></img>
                            最近文档
                            <Frame listsData={base3}/>
                        </li>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="myShare" onClick={(e)=>this.ContextRight2Click(e,'myshare')}>
                            <img src={icon.link.default}></img>
                            我的分享
                            <Frame listsData={base3}/>
                        </li>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="recycle" onClick={(e)=>this.ContextRight2Click(e,'dustbin')}>
                            <img src={icon.dustbin.default}></img>
                            回收站
                            <Frame listsData={base4}/>
                        </li>
                    </ul>
                    <ul className="fileTypesLists">
                        <p onContextMenu={(e)=>this.onContextMenu(e)} id="fileTypes" style={{cursor:'pointer',position: 'relative'}} onClick={(e)=>this.ContextRight2PClick(e,'filetype')}>
                            文件类型
                            <Frame listsData={base1}/>
                        </p>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="files" onClick={(e)=>this.ContextRight2Click(e,'file')}>
                            <img src={icon.file4.default}></img>
                            文档
                            <Frame listsData={base3}/>
                        </li>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="photos" onClick={(e)=>this.ContextRight2Click(e,'photo')}>
                            <img src={icon.photo.default}></img>
                            图片
                            <Frame listsData={base3}/>
                        </li>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="musics" onClick={(e)=>this.ContextRight2Click(e,'music')}>
                            <img src={icon.music.default}></img>
                            音乐
                            <Frame listsData={base3}/>
                        </li>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="videos" onClick={(e)=>this.ContextRight2Click(e,'video')}>
                            <img src={icon.video.default}></img>
                            视频
                            <Frame listsData={base3}/>
                        </li>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="packages" onClick={(e)=>this.ContextRight2Click(e,'package')}>
                            <img src={icon.package.default}></img>
                            压缩包
                            <Frame listsData={base3}/>
                        </li>
                        <li onContextMenu={(e)=>this.onContextMenu(e)} id="others" onClick={(e)=>this.ContextRight2Click(e,'others')}>
                            <img src={icon.file3.default}></img>
                            其他
                            <Frame listsData={base3}/>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <Route>
                        <Switch>
                            <Route path="/explorer/files/position" component={Files.Position}/>
                            <Route path="/explorer/files/favorite" component={Files.Favour}/>
                            <Route path="/explorer/files/myfile" component={Files.Myfiles}/>
                            <Route path="/explorer/files/tool" component={Files.Tool}/>
                            <Route path="/explorer/files/nearfile" component={Files.Nearfile}/>
                            <Route path="/explorer/files/myshare" component={Files.Myshare}/>
                            <Route path="/explorer/files/dustbin" component={Files.Dustbin}/>
                            <Route path="/explorer/files/filetype" component={Files.Filetype}/>
                            <Route path="/explorer/files/file" component={Files.File}/>
                            <Route path="/explorer/files/photo" component={Files.Photo}/>
                            <Route path="/explorer/files/music" component={Files.Music}/>
                            <Route path="/explorer/files/video" component={Files.Video}/>
                            <Route path="/explorer/files/others" component={Files.Others}/>
                            <Route path="/explorer/files/package" component={Files.Package}/>
                            <Route path="/explorer/editor" component={Editor}/>
                        </Switch>
                    </Route>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        menus: state.Menus
    }
}

export default connect(mapStateToProps, {initMyfie})(Menus);