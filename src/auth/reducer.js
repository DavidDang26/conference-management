export const initialState = { user: null, sideBarId: 1 };

export const actionTypes = { SET_USER: "SET_USER", SET_SIDE_BAR: "SET_SIDE_BAR" };

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionTypes.SET_SIDE_BAR:
            return {
                ...state,
                sideBarId: action.sideBarId,
            };

        default:
            return state;
    }
};

export default reducer;
