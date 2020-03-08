import { combineReducers} from 'redux';
import Register from './register';
import Login from './login';
import Self from './self';
import Myfiles from './myfiles';
import Menus from './menus';

export default combineReducers({
    Register,
    Login,
    Self,
    Myfiles,
    Menus,
})