<?php
namespace app\api\controller;
use think\Controller;
use think\Cache;
use think\cache\driver\Redis;
class Test extends Controller
{

    public function index()
    {    
        /*$han = new Cache;
        // halt($han);
        $han->set('name','klc123');
        $data = $han->get('name');
        $this->assign('data',$data);
        return $data;*/
        $han = new Cache;
        $result = $han->get('name');
        if ($result) {
            echo "从缓存取得<br>";
            print_r($result);
        } else {
            $cache = Db::name
        }
    }

}
?>