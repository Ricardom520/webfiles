<?php
namespace app\api\controller;
use think\Controller;
use think\Db;
use think\Request;

class File extends Controller
{
    public function index(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $userid = $data['userid'];
        $filetype = $data['filetype'];
        if ($filetype == 'file') {
            $sql = 'Select systemid, userid, filename, filetype, filesize, parentid, createtime,filetype_hz, favour from files where userid ="'.$userid.'" and filetype in (1,7,8,9)';
        } else {
            $sql = 'Select systemid, userid, filename, filetype, filesize, parentid, createtime,filetype_hz, favour from files where userid ="'.$userid.'" and filetype = "'.$filetype.'"';
        }
        $res = Db::query($sql);
        return $res;
    }

    public function find(Request $request)
    {
        header('Access-Control-Allow-Origin:*');
        $data = $request->get();
        $userid = $data['userid'];
        $filename = $data['filename'];
        $filetype = $data['filetype'];
        if ($filetype == 'file') {
            $sql = 'Select systemid, userid, filename, filetype, filesize, parentid, createtime,filetype_hz from files where userid ="'.$userid.'" and filetype in (1,7,8,9) and LOCATE("'.$filename.'",filename) > 0';
        } else {
            $sql = 'Select systemid, userid, filename, filetype, filesize, parentid, createtime,filetype_hz from files where userid ="'.$userid.'" and filetype ="'.$filetype.'" and LOCATE("'.$filename.'",filename) > 0';
        }
        $res = Db::query($sql);
        return $res;
    }
}
?>