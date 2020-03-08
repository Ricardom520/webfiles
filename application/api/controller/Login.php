<?php
namespace app\api\controller;
use think\Request;
use think\Db;
use think\Controller;

class Login extends Controller
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

        $sql = 'Select * from users where username="'.$username.'" and password="'.$password.'"';

        $res = Db::query($sql);

        if ($res) {
            $arr = array(
                "code"=>0,
                "msg"=>"登录成功",
                "res"=>$res
            );
            return $arr;
        } else {
            $arr = array(
                "code"=>1,
                "msg"=>"登录失败，用户名或密码错误"
            );
            return $arr;
        }
    }
}