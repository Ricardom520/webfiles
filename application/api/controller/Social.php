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
        $data = $request->get();
        $index = (int)$data['index'];
        $nums = Db::query('Select count(*) from sharespdf')[0]['count(*)'];
        if ((($index-1)*5) < $nums) {
            $sql = 'Select filename, bc, shareid from sharespdf order by visted limit '.(($index-1)*5).',5';
            $res = Db::query($sql);
            $arr = array(
                'res'=>$res,
            );
            return $arr;
        } else {
            return;
        }
    }

    public function openpdf(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $shareid = $data['shareid'];
        $sql = 'Select content from sharespdf where shareid = "'.$shareid.'"';
        $res = Db::query($sql);
        return $res[0];
    }

    public function live(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $index = (int)$data['index'];
        if ($index > 0) {
            $nums = Db::query('Select count(*) from shareswz')[0]['count(*)'];
            if ((($index-1)*5) < $nums) {
                $sql = 'Select filename, bc, shareid from shareswz order by visted limit '.(($index-1)*5).',5';
                $res = Db::query($sql);
                $arr = array(
                    'res'=>$res,
                );
                return $arr;
            } else {
                return;
            }
        }
    }

    public function openlive(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $shareid = $data['shareid'];
        $sql = 'Select * from shareswz s join users u on s.userid = u.userid where s.shareid="'.$shareid.'"';
        $res = Db::query($sql);
        return $res[0];
    }

    public function photo(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $index = (int)$data['index'];
        if ($index > 0 ) {
            $nums = Db::query('Select count(*) from shareswz')[0]['count(*)'];
            if ((($index-1)*5) < $nums) {
                $sql = 'Select filename, bc, shareid from sharespic order by visted limit '.(($index-1)*5).',5';
                $res = Db::query($sql);
                $arr = array(
                    'res'=>$res,
                    'index'=>$index
                );
                return $arr;
            } else {
                return;
            }   
        }
    }

    public function openphoto(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $shareid = $data['shareid'];
        $sql = 'Select content, disc, filename from sharespic where shareid ="'.$shareid.'"';
        $res = Db::query($sql)[0];
        $res['content'] = json_decode($res['content']);
        return $res;
    }

    public function software(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $data = $request->get();
        $index = (int)$data['index'];
        if ($index > 0 ) {
            $nums = Db::query('Select count(*) from shareswjj')[0]['count(*)'];
            if ((($index-1)*5) < $nums) {
                $sql = 'Select filename, bc, shareid from shareswjj order by visted limit '.(($index-1)*5).',5';
                $res = Db::query($sql);
                $arr = array(
                    'res'=>$res,
                    'index'=>$index
                );
                return $arr;
            } else {
                return;
            }   
        }
    }
}
?>