<?php
namespace app\api\controller;
use think\Controller;
use think\Cache;
//use think\cache\driver\Redis;
use think\Request;
use think\Cache\Driver\Redis;
use think\Db;
class Test extends Controller
{

    public function index(Request $request)
    {    
        $redis = new \Redis();
        $redis->connect("127.0.0.1", "6379");
        $res = Db::query('Select shareid from sharespdf');
        $redis->hset('line', 'systemid0', 0);
        $data = $redis->hgetall('line');
        return $data;
        /*$han = new Cache;
        // halt($han);
        $han->set('name','klc123');
        $data = $han->get('name');
        $this->assign('data',$data);
        return $data;*/
        /*$han = new Cache;
        $result = $han->get('name');
        if ($result) {
            echo "从缓存取得<br>";
            print_r($result);
        } else {
            //$cache = Db::name
        }
        return request()->ip();*/
        /*$cache = new Cache;
        //$cache->set('name','123', new DateTime('2020-3-31 15:00'));
        //Cache::set('name','456',new \DateTime('2020-3-31 15:00'));
        //Cache::set('name', 0);
        Cache::tag('tag')->set('name1',1);
        Cache::tag('tag')->set('name2',2);
        $data = $cache->get('name1');
        echo $data;*/
    }
    public function dec()
    {
        Cache::dec('name');
    }
}
?>