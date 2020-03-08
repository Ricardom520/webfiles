<?php
namespace app\api\controller;
use think\Request;
use think\Db;
use think\Controller;

class Register extends Controller
{
    public function index(Request $request)
    {
        //header('Content-Type: text/html;charset=utf-8');
        header('Access-Control-Allow-Origin:*'); // *代表允许任何网址请求
        header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
        header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
        header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); // 设置允许自定义请求头的字段
    
        $data = $request->post();
        $username = $data['username'];
        $password = MD5($data['password']);
        $email = $data['email'];

        $sqlUsername = 'Select * from users where username="'.$username.'"';
        $sqlEmail = 'Select * from users where email="'.$email.'"';

        $resName = Db::query($sqlUsername);
        $resEmail = Db::query($sqlEmail);

        if (!$resEmail && !$resName) {
            $currenttime = date('Y-m-d H:i:s');
            $userid = substr($username,0,2).time().substr($email,0,3);
            $Insql = 'Insert into users (userid, username, password, email, createtime) values ("'.$userid.'","'.$username.'","'.$password.'","'.$email.'","'.$currenttime.'")';
            Db::query($Insql);
            $arr = array(
                "code"=>0,
                "msg"=>"注册成功"
            );
            return $arr;
        } else if ($resName) {
            $arr = array(
                "code"=>1,
                "msg"=>"改用户名已被使用"
            );
            return $arr;
        } else if ($resEmail) {
            $arr = array(
                "code"=>1,
                "msg"=>"该邮箱已被注册"
            );
            return $arr;
        }
    }
}