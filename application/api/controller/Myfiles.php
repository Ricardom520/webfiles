<?php
namespace app\api\controller;
use think\Request;
use think\Db;
use think\Controller;

class Myfiles extends Controller
{
    public function index(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->post();
        $userid = $data['userid'];
        $parentid = $data['parentid'];
        $sql = 'Select systemid, userid, filename, filetype, filesize, parentid, createtime from files where userid ="'.$userid.'" and parentid ="'.$parentid.'"';
        $res = Db::query($sql);
        $this->mergeSort($res);
        for ($i = 0; $i <count($res); $i++) {
            $res[$i]['filesize'] = round(($res[$i]['filesize']/1024),2).'KB';
        }
        return $res;
    }

    public function paste(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->post();
        $userid = $data['userid'];
        $systemid = $data['copySystemid'];
        $curParentid = $data['curParentid'];
        $username = $data['username'];
        $SeSql = 'Select * from files where userid="'.$userid.'" and systemid="'.$systemid.'"';
        $file = Db::query($SeSql);
        $currentData = date('Y-m-d H:i:s');
        $newSystemid = substr($userid,0,2).time().substr($systemid,-2);
        $Insql = 'Insert into files (systemid,userid,parentid,filename,filetype,content,filesize,createtime,modifytime,username) 
                    values("'.$newSystemid.'","'.$userid.'","'.$curParentid.'","'.$file[0]['filename'].'",'.$file[0]['filetype'].',"'.$file[0]['content'].'"
                    ,"'.$file[0]['filesize'].'","'.$currentData.'","'.$currentData.'","'.$username.'")';
        Db::query($Insql);
        $file[0]['systemid'] = $newSystemid;
        $file[0]['parentid'] = $curParentid;
        $file[0]['createtime'] = $currentData;
        $file[0]['filesize'] = round(($file[0]['filesize'] / 1024),2).'KB';
        return $file[0];
    }

    public function rename(Request $request)
    {
        header('Access-Control-Allow-Origin:*');
        $data = $request->post();
        $systemid = $data['systemid'];
        $filename = $data['filename'];
        $userid = $data['userid'];
        $sql = 'Update files set filename="'.$filename.'" where systemid="'.$systemid.'" and userid="'.$userid.'"';
        Db::query($sql);
    }

    public function delete(Request $request)
    {
        header('Access-Control-Allow-Origin:*');
        $data = $request->post();
        $userid = $data['userid'];
        $systemid = $data['systemid'];
        $location = $data['location'];
        $SeSql = 'Select * from files where userid="'.$userid.'" and systemid ="'.$systemid.'"';
        $res = Db::query($SeSql);

        $currentData = date('Y-m-d H:i:s');
        $Insql = 'Insert into dustbin (systemid, userid, username, filename, filesize, filetype, content, deletetime, location) values (
                    "'.$systemid.'","'.$userid.'","'.$res[0]['username'].'","'.$res[0]['filename'].'",'.$res[0]['filesize'].','
                    .$res[0]['filetype'].',"'.$res[0]['content'].'","'.$currentData.'","'.$location.'")';
        Db::query($Insql);
        $Delsql = 'Delete from files where systemid="'.$systemid.'" and userid="'.$userid.'"';
        $a = Db::query($Delsql);
        $arr = array(
            'code'=>0,
            'msg'=>'删除成功'
        );
        return $arr;
    }

    public function createfile(Request $request)
    {
        header('Access-Control-Allow-Origin:*');
        $data = $request->post();
        $filesize = 0;
        $filetype = 0;
        $filename = '新建文件夹';
        $currentData = date('Y-m-d H:i:s');
        $parentid = $data['parentid'];
        $userid = $data['userid'];
        $username = $data['username'];
        $systemid = substr($userid,0,2).time().rand(0,10);
        $Insql = 'Insert into files (systemid, userid, parentid, username, filename, filesize, filetype, content, createtime) values (
            "'.$systemid.'","'.$userid.'","'.$parentid.'","'.$username.'","'.$filename.'",'.$filesize.','
            .$filetype.',null,"'.$currentData.'")';
        Db::query($Insql);
        $arr = array(
            'filename'=>$filename,
            'filesize'=>$filesize,
            'filetype'=>$filetype,
            'createtime'=>$currentData,
            'parentid'=>$parentid,
            'username'=>$username,
            'systemid'=>$systemid,
        );
        return $arr;
    }

    public function upload(Request $request)
    {
        header('Access-Control-Allow-Origin:*');
        $data = $request->post();
        $userid = $data['userid'];
        $parentid = $data['parentid'];
        $filename = $data['filename'];
        $filesize = (double)$data['filesize'];
        $filetype = (int)$data['filetype'];
        $content = $data['content'];
        $username = $data['username'];
        $currentData = date('Y-m-d H:i:s');
        $systemid = substr($userid,0,2).time().rand(0,10);
        $Insql = 'Insert into files (systemid, userid, parentid, username, filename, filesize, filetype, content, createtime) values (
            "'.$systemid.'","'.$userid.'","'.$parentid.'","'.$username.'","'.$filename.'",'.$filesize.','
            .$filetype.',"'.$content.'","'.$currentData.'")';
        Db::query($Insql);
        $filesize = round(($filesize / 1024),2).'KB';
        $arr = array(
            'filename'=>$filename,
            'filesize'=>$filesize,
            'filetype'=>$filetype,
            'createtime'=>$currentData,
            'parentid'=>$parentid,
            'username'=>$username,
            'systemid'=>$systemid,
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