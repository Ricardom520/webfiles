import React , { Component } from 'react';
import { icon, common } from '../../images';
import './tablemenus.less';

class TableMenus extends Component {
    uploadFile(e) {
        let target = document.getElementById('file');
        let file = e.target.files[0];
        console.log(file)
        let name = file.name;
        let filename = name.split('.')[0];
        let type = name.split('.')[1];
        let filetype;
        if (type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'gif' || type == 'webp') {
            filetype = 2;
        }
        let filesize = file.size;
        let reader = new window.FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            console.log("进来了吗")
            let params = Object.assign({filename:filename},{filetype:filetype},{filesize:filesize},{content:reader.result})
            //this.props.uploadFile(params)
        }
        target.outerHTML = target.outerHTML;
    }
    render() {
        const {tbodyMenus,refresh,pasteFile,copySystemid,showAttribute,createFile,uploadFile} = this.props;
        return (
            <div className="tablemenusContainer" style={tbodyMenus?{display:'block'}:{display:'none'}} id="tbodymenus">
                <ul className="line">
                    <li onClick={refresh}>
                        <img src={icon.refresh.default}></img>刷新
                    </li>
                </ul>
                <ul className="line">
                    <li>
                        <label for="file">
                            <img src={common.arrow2.default}></img>上传文件
                        </label>
                        <input type="file" id="file" style={{display:'none'}} onChange={(e)=>this.uploadFile(e)}></input>
                    </li>
                    <li onClick={createFile}>
                        <img src={common.file.default}></img>新建文件夹
                    </li>
                    <li onClick={pasteFile} style={copySystemid?{display: 'block'}: {display: 'none'}}>
                        <img src={icon.paste.default}></img>粘贴
                    </li>
                </ul>
                <ul className="line">
                    <li>
                        <img src={icon.watch.default}></img>查看
                    </li>
                    <li>
                        <img src={icon.sort.default}></img>排序方式
                    </li>
                </ul>
                <ul>
                    <li onClick={showAttribute}>
                        <img src={icon.attribute.default}></img>属性
                    </li>
                </ul>
            </div>
        )
    }
}

export default TableMenus;