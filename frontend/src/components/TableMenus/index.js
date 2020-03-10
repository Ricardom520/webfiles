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
        console.log(type)
        switch (type) {
            case 'jpg' || 'jpeg' || 'png' || 'gif' || 'webp' ||  'svg': // 图片
                filetype = 2;
                break;
            case 'xlsx': // excel表格
                filetype = 7;
                break;
            case 'zip': // 压缩包
                filetype = 5;
                break;
            case 'docx' || 'doc': // word文档
                filetype = 1;
                break;
            case 'pdf': // pdf
                filetype = 9;
                break;
            case 'ppt' ||  'pptx': // ppt
                filetype = 8;
                break;
            case 'cda' || 'wav' || 'mp3' || 'wma' || 'ra' || 'midi' || 'ogg' || 'ape' || 'flac' || 'aac':
                filetype = 3;
                break;
            case 'avi' ||  'mpeg' ||  'mpg' || 'dat' || 'ra' || 'rm' || 'mov' || 'qt' || 'asf' || 'wmv' || 'avi':
                filetype = 4;
                break;
            default:
                filetype = 6;
                break;

        }
        let filesize = file.size;
        let reader = new window.FileReader();
        reader.readAsDataURL(file);
        let that = this;
        reader.onload = function() {
            //console.log(reader.result)
            let params = Object.assign({filename:filename},{filetype:filetype},{filesize:filesize},{content:reader.result},{filetype_cn:type})
            that.props.uploadFile(params)
        }
        target.value = '';
    }
    render() {
        const {tbodyMenus,refresh,pasteFile,copySystemid,showAttribute,createFile} = this.props;
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