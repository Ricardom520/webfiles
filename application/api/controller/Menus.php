<?php
namespace app\api\controller;
use think\Request;
use think\Db;
use think\Controller;

class Menus extends Controller {
    public function myfile(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->post();
        $userid = $data['userid'];
        $parentid = $data['parentid'];
        $sql = 'Select systemid, filename, parentid from files where userid = "'.$userid.'" and filetype = 0';
        $res = Db::query($sql);
        $res = $this->tree($res, 'myfile');
        return $res;
    }
    private function tree($arr, $pid) {
        $tree = array();
        foreach ($arr as $key => $value) {
            if ($value['parentid'] == $pid) {
                $value['children'] = $this->tree($arr, $value['systemid']);
                if (!$value['children']) {
                    unset($value['children']);
                }
                $tree[] = $value;
            }
        }
        return $tree;
    }
}
?>