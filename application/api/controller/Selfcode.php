<?php
namespace app\api\controller;
use think\Request;
use think\Db;
use think\Controller;

class Selfcode extends Controller
{
    public function index(Request $request)
    {
        //header('Content-Type: text/html;charset=utf-8');
        header('Access-Control-Allow-Origin:*'); // *代表允许任何网址请求
        header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
        header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
        header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); // 设置允许自定义请求头的字段
    
        $data = $request->post();
        $userid = $data['userid'];
        $sql = 'Select * from users where userid ="'.$userid.'"';
        $res = Db::query($sql);
        return $res[0];
    }

    public function modify(Request $request)
    {
        header('Access-Control-Allow-Origin:*'); // *代表允许任何网址请求
        header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
        header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
        header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); // 设置允许自定义请求头的字段

        $data = $request->post();
        $userid = $data['userid'];
        $email = $data['email'];
        $photo = $data['photo'];
        $sex = $data['sex'];
        $nc = $data['nc'];
        $bc = $data['bc'];
        $says = $data['says'];

        if ($email) {
            $emailSql = 'Select * from users where email="'.$email.'"';
            $emailRes = Db::query($emailSql);
            if ($emailRes) {
                $arr = array(
                    "code"=>1,
                    "msg"=>"该邮箱已被注册"
                );
                return $arr;
            }
            $Sqlemail = ',email = "'.$email.'"';
        } else {
            $Sqlemail = '';
        }

        if ($nc) {
            $Sqlnc = ',nc = "'.$nc.'"';
        } else {
            $Sqlnc = '';
        }

        if ($photo) {
            $Sqlphoto = ',photo = "'.$photo.'"';
        } else {
            $Sqlphoto = '';
        }

        if ($sex === '0' || $sex === '1') {
            $Sqlsex = ',sex = "'.$sex.'"';
        } else {
            $Sqlsex = '';
        }

        if ($says) {
            $Sqlsays = ', says = "'.$says.'"';
        } else {
            $Sqlsays = '';
        }

        if ($bc) {
            $Sqlbc = ',bc = "'.$bc.'"';
        } else {
            $Sqlbc = '';
        }

        $Insql = 'Update users set userid="'.$userid.'"'.$Sqlemail.$Sqlnc.$Sqlsex.$Sqlsays.$Sqlphoto.$Sqlbc.' where userid="'.$userid.'"';
        Db::query($Insql);
        $arr = array(
            'code'=>0,
            'msg'=>'保存成功'
        );
        return $arr;
    }

    public function password(Request $request)
    {
        header('Access-Control-Allow-Origin:*');

        $data = $request->post();
        $oldPass = $data['oldPass'];
        $newPass = $data['newPass'];
        $userid = $data['userid'];

        $PassSql = 'Select * from users where userid="'.$userid.'" and password="'.MD5($oldPass).'"';
        $checkPass = Db::query($PassSql);
        if (!$checkPass) {
            $arr = array(
                'code'=>1,
                'msg'=>'旧密码不一致'
            );
            return $arr;
        }
        $UpSql = 'Update users set password="'.MD5($newPass).'" where userid="'.$userid.'"';
        Db::query($UpSql);
        $arr = array(
            'code'=>0,
            'msg'=>'修改成功'
        );
        return $arr;
    }

    public function photo (Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $userid = $data['userid'];
        $sql = 'Select photo from users where userid="'.$userid.'"';
        $res = Db::query($sql);
        return $res;
    }
}
?>