import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// eslint-disable-next-line 
export default reducers => persistReducer(
  {
    key: 'CONSUME-API',
    storage,
    whitelist: ['auth']
  },
  reducers
);
