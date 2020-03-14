<?php
namespace app\api\controller;
use think\Request;
use think\Db;
use think\Controller;

class Share extends Controller
{
    public function index(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $userid = $data['userid'];
        $parentid = $data['parentid'];
        $sql = 'Select systemid, userid, filename, filetype, filesize, parentid, createtime,filetype_hz, sharetime from files where userid ="'.$userid.'" and parentid ="'.$parentid.'" and share = 1';
        $res = Db::query($sql);
        $this->mergeSort($res);
        for ($i = 0; $i <count($res); $i++) {
            $res[$i]['filesize'] = round(($res[$i]['filesize']/1024),2).'KB';
            switch($res[$i]['filetype']) {
                case 0:
                    $res[$i]['filetype_cn'] = '文件夹';
                    break;
                case 1:
                    $res[$i]['filetype_cn'] = 'WORD';
                    break;
                case 2:
                    $res[$i]['filetype_cn'] = '图片';
                    break;
                case 3:
                    $res[$i]['filetype_cn'] = '音乐';
                    break;
                case 4:
                    $res[$i]['filetype_cn'] = '视频';
                    break;
                case 5:
                    $res[$i]['filetype_cn'] = '压缩包';
                    break;
                case 6:
                    $res[$i]['filetype_cn'] = '其他';
                    break;
                case 7:
                    $res[$i]['filetype_cn'] = 'EXCEL';
                    break;
                case 8:
                    $res[$i]['filetype_cn'] = 'PPT';
                    break;
                case 9:
                    $res[$i]['filetype_cn'] = 'PDF';
                    break;
                default:
                    $res[$i]['filetype_cn'] = '其他';
                    break;
            };
        }
        return $res;
    }

    public function cancel(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->post();
        $userid = $data['userid'];
        $systemid = $data['systemid'];
        $Upsql = 'Update files set share = 0, sharetime = null where userid="'.$userid.'" and systemid="'.$systemid.'"';
        Db::query($Upsql);
        $Desql = 'Delete from shares where userid="'.$userid.'" and systemid="'.$systemid.'"';
        Db::query($Desql);
        $arr = array(
            'code'=>0,
            'msg'=>'取消成功'
        );
        return $arr;
    }

    private function mergeSort(&$arr) 
    {
        $len = count($arr);
        $this->mSort($arr, 0, $len - 1);
    }
    private function mSort(&$arr, $left, $right) 
    {
        if ($left < $right) {
            $center = floor(($left + $right) / 2);
            $this->mSort($arr, $left, $center);
            $this->mSort($arr, $center + 1, $right);
            $this->mergeArray($arr, $left, $center, $right);
        }
    }
    private function mergeArray(&$arr, $left, $center, $right) 
    {
        $a_i = $left;
        $b_i = $center + 1;
        while ($a_i <= $center && $b_i <= $right) {
            if ($arr[$a_i]['filetype'] < $arr[$b_i]['filetype']) {
                $temp[] = $arr[$a_i++];
            } else {
                $temp[] = $arr[$b_i++];
            }
        }
        while ($a_i<=$center) {
            $temp[] = $arr[$a_i++];
        }
        while ($b_i<=$right) {
            $temp[] = $arr[$b_i++];
        }
        for ($i = 0, $len = count($temp); $i < $len; $i++) {
            $arr[$i+$left] = $temp[$i];
        }
    }
}
?>