<?php
namespace app\api\Controller;
use think\Request;
use think\Db;
use think\Controller;

class Social extends Controller 
{
    public function pdf(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $sql = 'Select filename, bc from sharespdf';
        $res = Db::query($sql);
        return $res;
    }
}
?>