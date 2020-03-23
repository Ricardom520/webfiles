import { combineReducers} from 'redux';
import Register from './register';
import Login from './login';
import Self from './self';
import Myfiles from './myfiles';
import Menus from './menus';
import Dustbin from './dustbin';
import Favourite from './favorite';
import File from './File';
import Myshare from './myshare';
import Explorer from './explorer';
import Social from './social';
import Editor from './editor';
import Live from './live';

export default combineReducers({
    Register,
    Login,
    Self,
    Myfiles,
    Menus,
    Dustbin,
    Favourite,
    File,
    Myshare,
    Explorer,
    Social,
    Editor,
    Live,
})