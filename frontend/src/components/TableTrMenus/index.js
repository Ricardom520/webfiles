import React , { Component } from 'react';
import { icon, common } from '../../images';
import '../TableMenus/tablemenus.less';

class TableMenus extends Component {
    render() {
        let {trMenus,copyFile,renameFile,deleteFile,shearFile,showAttribute} = this.props;
        console.log(trMenus)
        return (
            <div className="tablemenusContainer" style={trMenus?{display:'block'}:{display:'none'}} id="trmenus">
                <ul className="line">
                    <li>
                        <img src={icon.open.default}></img>打开
                    </li>
                    <li>
                        <img src={icon.download.default}></img>下载
                    </li>
                    <li>
                        <img src={icon.link.default}></img>分享
                    </li>
                </ul>
                <ul className="line">
                    <li onClick={copyFile}>
                        <img src={icon.copy.default}></img>复制
                    </li>
                    <li onClick={shearFile}>
                        <img src={icon.shear.default}></img>剪切
                    </li>
                    <li onClick={renameFile}>
                        <img src={icon.rename.default}></img>重命名
                    </li>
                    <li onClick={deleteFile}>
                        <img src={icon.dustbin.default}></img>删除
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