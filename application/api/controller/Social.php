<?php
namespace app\api\Controller;
use think\Request;
use think\Db;
use think\Controller;

class Social extends Controller 
{
    public function nrjx(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        $pdfsql = 'Select filename, shareid, liked, visted, fav, bc, sharetime from sharespdf order by liked limit 5';
        $pdfres = Db::query($pdfsql);
        $picsql = 'Select filename, shareid, liked, visted, fav, bc, sharetime from sharespic order by liked limit 5';
        $picres = Db::query($pdfsql);
        $wjjsql = 'Select filename, shareid, liked, visted, fav, bc, sharetime from shareswjj order by liked limit 5';
        $wjjres = Db::query($wjjsql);
        $wzsql = 'Select filename, shareid, liked, visted, fav, bc, sharetime from shareswz order by liked limit 5';
        $wzres = Db::query($wzsql);

        $res = array_merge($pdfres,$picres,$wjjres,$wzres);
        $this->merge($res);

        $len = count($res);
        for ($i = $len - 1; $i > $len - 6; $i--)
        {
            $res[$i]['sharetime'] = date('Y.m.d', strtotime($res[$i]['sharetime']));
            $temp[] = $res[$i];
        }
        return $temp;
    }

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

    private function merge(&$arr)
    {
        $len = count($arr);
        $this->mergeSort($arr, 0, $len - 1);
    }

    private function mergeSort(&$arr, $left, $right)
    {
        if ($left < $right)
        {
            $center = floor(($left + $right)/2);
            $this->mergeSort($arr, $left, $center);
            $this->mergeSort($arr, $center + 1, $right);
            $this->merge_array($arr, $left, $center, $right);
        }
    }

    private function merge_array(&$arr, $left, $center, $right)
    {
        $a_i = $left;
        $b_i = $center + 1;
        while($a_i <= $center && $b_i <= $right)
        {
            if ($arr[$a_i]['liked'] < $arr[$b_i]['liked'])
            {
                $temp[] = $arr[$a_i++];
            }
            else 
            {
                $temp[] = $arr[$b_i++];
            }
        }
        while ($a_i <= $center) 
        {
            $temp[] = $arr[$a_i++];
        }
        while ($b_i <= $center)
        {
            $temp[] = $arr[$b_i++];
        }
        $len = count($temp);
        for ($i = 0; $i < $len; $i++)
        {
            $arr[$i+$left] = $temp[$i];
        }
    }
}
?>