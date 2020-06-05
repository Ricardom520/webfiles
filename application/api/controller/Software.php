<?php
namespace app\api\controller;
use think\Controller;
use think\Db;
use think\Request;

class Software extends Controller
{
    public function index(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $shareid = $data['shareid'];
        $sql = 'Select * from shareswjj s join users u where s.userid = u.userid and s.shareid="'.$shareid.'"';
        $res = Db::query($sql)[0];
        $arr = array (
            'shareid'=>$res['shareid'],
            'userid'=>$res['userid'],
            'content'=>$res['content'],
            'filename'=>$res['filename'],
            'photo'=>$res['photo'],
            'sharetime'=>$res['sharetime'],
            'updatetime'=>$res['updatetime'],
            'visted'=>$res['visted'],
            'liked'=>$res['liked'],
            'filetype'=>$res['filetype'],
            'nc'=>$res['nc'],
            'filetitlename'=>$res['filetitlename'],
        );
        return $arr;
    }

    public function download(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->post();
        $shareid = $data['shareid'];
        $sql = 'Select content, file_hz, filename from shareswjj where shareid="'.$shareid.'"';
        $res = Db::query($sql);
        return $res[0];
    }

    public function common(Request $request) 
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $shareid = $data['shareid'];
        $sql = 'Select * from commons where shareid="'.$shareid.'" and commonchild = 0 order by commontime';
        $res = Db::query($sql);
        return $res;
    }

    public function subcom(Request $request)
    {
      header('Access-Control-Allow-Origin: *');
      $data = $request->post();
      $shareid = $data['shareid'];
      $userid = $data['userid'];
      $commonname = $data['commonname'];
      $commonuser = $data['commonuser'];
      $commontime = date('Y-m-d H:i:s');
      $commonid = $shareid.substr(time(),0,3);
      $sql = 'Insert into commons (shareid,userid,commonid,commonname,commontime,commonuser) values 
                ("'.$shareid.'","'.$userid.'","'.$commonid.'","'.$commonname.'","'.$commontime.'","'.$commonuser.'")';
      Db::query($sql);
      return $sql;
    }
}
?>