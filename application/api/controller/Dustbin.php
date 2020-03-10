<?php
namespace app\api\controller;
use think\Controller;
use think\Db;
use think\Request;

class Dustbin extends Controller {
    public function index(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $userid = $data['userid'];
        $sql = 'Select systemid, userid, username, filename, filetype, filetype_hz, filesize, createtime, deletetime, location from dustbin where userid="'.$userid.'"';
        $res = Db::query($sql);
        $this->mergeSort($res);
        $currentData = time();
        $len = count($res);
        for ($i = 0; $i < $len; $i++) {
            if ((($currentData-strtotime($res[$i]['deletetime']))/86400)>30) {
                DB::query('Delete from dustbin where userid="'.$userid.'"and systemid="'.$res[$i]['systemid'].'"');
            }
        }
        $sql = 'Select systemid, userid, username, filename, filetype, filetype_hz, filesize, createtime, deletetime, location from dustbin where userid="'.$userid.'"';
        $res = Db::query($sql);
        $len = count($res);
        for ($i = 0; $i < $len; $i++) {
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

    public function delete(Request $request)
    {
        header('Access-Control-Allow-Origin:*');
        $data = $request->post();
        $userid = $data['userid'];
        $systemid = $data['systemid'];
        $sql = 'Delete from dustbin where userid="'.$userid.'" and systemid ="'.$systemid.'"';
        Db::query($sql);
        $arr = array(
            'code'=>0,
            'msg'=>'删除成功'
        );
        return $arr;
    }

    public function reduction(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->post();
        $userid = $data['userid'];
        $systemid = $data['systemid'];
        $Sqsql = 'Select * from dustbin where userid="'.$userid.'"';
        $res = Db::query($Sqsql);
        $currentData = date('Y-m-d H:i:s');
        $Insql = 'Insert into files (systemid,userid,parentid,filename,filetype,content,filesize,createtime,modifytime,username,filetype_hz) 
                    values("'.$systemid.'","'.$userid.'","'.$res[0]['parentid'].'","'.$res[0]['filename'].'",'.$res[0]['filetype'].',"'.$res[0]['content'].'"
                    ,'.$res[0]['filesize'].',"'.$res[0]['createtime'].'","'.$currentData.'","'.$res[0]['username'].'","'.$res[0]['filetype_hz'].'")';
        Db::query($Insql);
        $sql = 'Delete from dustbin where userid="'.$userid.'" and systemid ="'.$systemid.'"';
        Db::query($sql);
        $arr = array(
            'code'=>0,
            'msg'=>'还原成功'
        );
        return $arr;
    }

    public function find(Request $request)
    {
        header('Access-Control-Allow-Origin:*');
        $data = $request->get();
        $userid = $data['userid'];
        $filename = $data['filename'];
        $sql = 'Select systemid, userid, filename, filetype, filesize, parentid, createtime, deletetime, location, filetype_hz from dustbin where userid ="'.$userid.'" and LOCATE("'.$filename.'",filename) > 0';
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