<?php
namespace app\api\controller;
use think\Controller;
use think\Db;
use think\Request;

class Admin extends Controller
{
  public function liveno(Request $request)
  {
    header('Access-Control-Allow-Origin: *');
    $sql = 'Select shareid, username, sharetime, filename, disc from shareswz where status = 0';
    $res = Db::query($sql); 
    return $res;
  }
  public function liveyes(Request $request)
  {
    header('Access-Control-Allow-Origin: *');
    $sql = 'Select shareid, username, sharetime, filename, disc from shareswz where status = 1';
    $res = Db::query($sql); 
    return $res;
  }
  public function photo(Request $request)
  {
    header('Access-Control-Allow-Origin: *');
    $sql = 'Select shareid, username, sharetime, filename, disc from sharespic';
    $res = Db::query($sql); 
    return $res;
  }
  public function software(Request $request)
  {
    header('Access-Control-Allow-Origin: *');
    $sql = 'Select shareid, username, sharetime, filename, disc from shareswjj';
    $res = Db::query($sql); 
    return $res;
  }
  public function pdf(Request $request)
  {
    header('Access-Control-Allow-Origin: *');
    $sql = 'Select shareid, username, sharetime, filename, disc from sharespdf';
    $res = Db::query($sql); 
    return $res;
  }
  public function files(Request $request)
  {
    header('Access-Control-Allow-Origin: *');
    $sql = 'Select systemid, username, modifytime, filename, filetype, filesize from files where filetype != 0';
    $res = Db::query($sql); 
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
  public function users(Request $request)
  {
    header('Access-Control-Allow-Origin: *');
    $sql = 'Select username, createtime, sex, email, phone, nc, address from users';
    $res = Db::query($sql); 
    return $res;
  }

  public function deletelive(Request $request)
  {
    header('Access-Control-Allow-Origin: *');
    $data = $request->post();
    $shareid = $data['shareid'];
    $sql = 'Delete from shareswz where shareid="'.$shareid.'"';
    $arr = array(
      'code'=>0,
      'msg'=>'删除成功'
    );
    return $arr;
  }

  public function passlive(Request $request)
  {
    header('Access-Control-Allow-Origin: *');
    $data = $request->post();
    $shareid = $data['shareid'];
    $sql = 'Update shareswz set status= 1';
    Db::query($sql);
    $arr = array(
      'code'=>0,
      'msg'=>'操作成功'
    );
    return $arr;
  }
}