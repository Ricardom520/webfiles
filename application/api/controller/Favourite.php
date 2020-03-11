<?php
namespace app\api\controller;
use think\Request;
use think\Controller;
use think\Db;

class Favourite extends Controller
{
    public function index (Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $userid = $data['userid'];
        $parentid = $data['parentid'];
        if ($parentid == 'favourite') {
            $sql = 'Select systemid, userid, filename, filetype, filesize, parentid, createtime,filetype_hz from files where userid ="'.$userid.'" and favour=1';
        } else {
            $sql = 'Select systemid, userid, filename, filetype, filesize, parentid, createtime,filetype_hz from files where userid ="'.$userid.'" and parentid ="'.$parentid.'" and favour =1';
        }
        
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
        header('Access-Control-Allow-Origin:*');
        $data = $request->post();
        $userid = $data['userid'];
        $filetype = $data['filetype'];
        $systemid = $data['systemid'];
        $sql = 'Update files set favour= 0 where systemid="'.$systemid.'" and userid="'.$userid.'"';
        Db::query($sql);
        if ($filetype === 0) {
            $SeSql = 'Select systemid, userid from files where userid="'.$userid.'" and parentid="'.$systemid.'"';
            $res = Db::query($SeSql);
            if ($res) {
                $len = count($res);
                for ($i = 0; $i < $len; $i++) {
                    $sql = 'Update files set favour= 0 where systemid="'.$res[0]['systemid'].'" and userid="'.$userid.'"';
                    Db::query($sql);
                }
            }
        }
        $arr = array(
            'code'=>0,
            'msg'=>'取消收藏成功'
        );
        return $data;
    }

    public function find(Request $request)
    {
        header('Access-Control-Allow-Origin:*');
        $data = $request->post();
        $userid = $data['userid'];
        $parentid = $data['parentid'];
        $filename = $data['filename'];
        $sql = 'Select systemid, userid, filename, filetype, filesize, parentid, createtime,filetype_hz from files where favour = 1 and userid ="'.$userid.'" and parentid ="'.$parentid.'" and LOCATE("'.$filename.'",filename) > 0';
        $res = Db::query($sql);
        return $res;
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