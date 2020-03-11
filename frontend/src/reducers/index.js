import { combineReducers} from 'redux';
import Register from './register';
import Login from './login';
import Self from './self';
import Myfiles from './myfiles';
import Menus from './menus';
import Dustbin from './dustbin';
import Favourite from './favorite';

export default combineReducers({
    Register,
    Login,
    Self,
    Myfiles,
    Menus,
    Dustbin,
    Favourite,
})