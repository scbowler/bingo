import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import game from './game_reducer';
import lobby from './lobby_reducer';
import user from './user_reducer';

export default combineReducers({
    form, game, lobby, user
});
