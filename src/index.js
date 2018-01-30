import { createStore } from 'redux';
//新建store
//通过reducer建立
//根据老的state和action生成新的state
const counter = (state = 0, action) => {
    switch (action.type) {
        case '加机关枪':
            return state + 1;
        case '减机关枪':
            return state - 1;
        default:
            return 10;
    }
};

const store = createStore(counter);

const init = store.getState();

console.log(init)

store