import React , { Component } from 'react';
import { icon, common } from '../../images';
import '../TableMenus/tablemenus.less';

class DustbinTbodyMenus extends Component {
    render() {
        const {dustbinTbodyMenus,refresh,showAttribute} = this.props;
        return (
            <div className="tablemenusContainer" style={dustbinTbodyMenus?{display:'block'}:{display:'none'}} id="dustbinTbodyMenus">
                <ul className="line">
                    <li onClick={refresh}>
                        <img src={icon.refresh.default}></img>刷新
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
            </div>
        )
    }
}

export default DustbinTbodyMenus;