<?php
namespace app\api\controller;
use think\Request;
use think\Db;
use think\Controller;

class Editor extends Controller
{
    public function index (Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->post();
        $curretData = date('Y-m-d H:i:s');
        $userid = $data['userid'];
        $content = $data['content'];
        $username = $data['username'];
        $desc = $data['desc'];
        $filename = $data['filename'];
        $bc = $data['bc'];
        $desc = $data['desc'];
        $shareid = 'S'.substr($userid,0,2).time().rand(10,100).'1';
        $sql = 'Insert into shareswz (shareid, userid, username, content, disc, filename, sharetime, bc, filetype) values ("'.$shareid
                .'","'.$userid.'","'.$username.'",\''.$content.'\',"'.$desc.'",\''.$filename.'\',"'.$curretData.'","'.$bc.'","live")';
        Db::query($sql);
        $arr = array(
            'code'=>0,
            'msg'=>'分享成功'
        );
        return $arr;
    }
}
?>