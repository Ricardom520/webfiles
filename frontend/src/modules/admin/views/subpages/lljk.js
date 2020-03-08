import React, {Component, Fragment} from 'react';
import {common, icon} from '../../../../images';
import {Link} from 'react-router-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import echarts from 'echarts/lib/echarts'
//导入饼图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
import '../admin.less';


ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const dataSource = {
	"chart": {
	  "caption": "访问情况",
	  "yaxisname": "登录人数",
	  //"subcaption": "最上端 : 副标题",
	  "numdivlines": "3",
	  "showvalues": "0",
	  "legenditemfontsize": "15",
	  "legenditemfontbold": "1",
	  "plottooltext": "<b>$dataValue</b> 此处设置鼠标浮动到点上时显示的文字 $label",
	  "theme": "fusion"
	},
	"categories": [
	  {
		"category": [
		  {
			"label": "星期一"
		  },
		  {
			"label": "星期二"
		  },
		  {
			"label": "星期三"
		  },
		  {
			"label": "星期四"
		  },
		  {
			"label": "星期五"
		  },
		  {
			"label": "星期六"
		  },
		  {
			"label": "星期天"
		  }
		]
	  }
	],
	"dataset": [
	  {
		"seriesname": "文件区",
		"data": [
		  {
			"value": "55"
		  },
		  {
			"value": "45"
		  },
		  {
			"value": "52"
		  },
		  {
			"value": "29"
		  },
		  {
			"value": "48"
		  },
		  {
			"value": "28"
		  },
		  {
			"value": "32"
		  }
		]
	  },
	  {
		"seriesname": "社区",
		"data": [
		  {
			"value": "50"
		  },
		  {
			"value": "30"
		  },
		  {
			"value": "49"
		  },
		  {
			"value": "22"
		  },
		  {
			"value": "43"
		  },
		  {
			"value": "14"
		  },
		  {
			"value": "31"
		  }
		]
	  }
	]
  };
const chartConfigs = {
	  type: 'msspline',//column2d是柱形图，Pie3D饼图,mscombi2d柱形折线饼结合，dragcolumn2d...,msspline双曲线，spline单曲线
	  width: '100%',
	  height: 400,
	  dataFormat: 'json',
	  dataSource: dataSource,
};
class Chart extends Component {
	render () {
	  return <ReactFC {...chartConfigs} />;
	}
}
class Lljk extends Component {
    getOption = ()=>{
        let option = {
            title: {
                text: '社区上传情况',
                x: 'center'
            },
            tooltip : {
                trigger: 'item',
                //提示框浮层内容格式器，支持字符串模板和回调函数形式。
                formatter: "{a} <br/>{b} : {c} ({d}%)" 
            },
            legend: {
                orient: 'vertical',
                top: 20,
                right: 5,
                data: ['生活类','文章类','软件类','照片类']
            },
            series : [
                {
                    name:'社区上传数量',
                    type:'pie',
                    data:[
                        {value:1000, name:'生活类'},
                        {value:1500, name:'文章类'},
                        {value:2000, name:'软件类'},
                        {value:2500, name:'照片类'},
                    ],
                }
            ]
        }
        return option;
    }
    render() {
        return (
            <Fragment>
                <div className="modal modal1">
                    <div className="lineContainer">
                        <Chart/>
                    </div>
                    <div className="PieContainer">
                        <ReactEcharts option={this.getOption()}/>
                    </div>
                </div>
                <div className="modal modal2">
                    <div className="newsContainer">
                        <p>通知</p>
                        <ul>
                            <li>
                                <Link>
                                    1.哈哈哈哈
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    2.认真净胜
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    1.哈哈哈哈
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    2.认真净胜
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    1.哈哈哈哈
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    2.认真净胜
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    1.哈哈哈哈
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    2.认真净胜
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Lljk;