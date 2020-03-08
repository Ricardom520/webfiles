import React, {Component} from 'react';
import './rename.less';

class Rename extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: ''
        }
    }

    onChange(e) {
        let value = e.target.value;
        this.setState({
            filename: value
        })
    }

    handleNewName() {
        this.props.handleNewName(this.state.filename);
    }
    componentWillReceiveProps(next) {
        console.log(next)
        this.setState({
            filename: next.filename
        })
        console.log("这里这哦")
    }
    render() {
        let {renameFlag,cancelRename} = this.props;
        let {filename} = this.state;
        return(
            <div className="RenameContainer" style={renameFlag?{display:'block'}:{display:'none'}}>
                <div className="box">
                    <div className="Content">
                        <div className="title">
                            <span className="til">重命名</span>
                            <span onClick={cancelRename}>X</span>
                        </div>
                        <div className="middle">
                            <label>文件名：</label><input value={filename} onChange={(e)=>this.onChange(e)}></input>
                        </div>
                        <div className="btnContent">
                            <button className="submit" onClick={()=>this.handleNewName()}>确认</button>
                            <button className="reset" onClick={cancelRename}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Rename;