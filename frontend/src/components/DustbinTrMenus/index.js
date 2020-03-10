import React , { Component } from 'react';
import { icon, common } from '../../images';
import '../TableMenus/tablemenus.less';

class DustbinTrMenus extends Component {
    render() {
        const {dustbinTrMenus,refresh,showAttribute,deleteDustbin,reductionDustbin} = this.props;
        return (
            <div className="tablemenusContainer" style={dustbinTrMenus?{display:'block'}:{display:'none'}} id="dustbinTrMenus">
                <ul className="line">
                    <li onClick={refresh}>
                        <img src={icon.refresh.default}></img>刷新
                    </li>
                </ul>
                <ul className="line">
                    <li onClick={reductionDustbin}>
                        <img src={icon.reduction.default}></img>还原
                    </li>
                    <li onClick={deleteDustbin}>
                        <img src={icon.dustbin.default}></img>彻底删除
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

export default DustbinTrMenus;