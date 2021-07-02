// const SET_LIST_TYPES = "list_type/SET_LIST_TYPES"
// const GET_LIST_TYPES = "list_type/GET_LIST_TYPES"


// const setListTypes = (types) => ({
//     type: SET_LIST_TYPES,
//     list_types: types
// })

// const editListTypes = (types) => ({
//     type: EDIT_LIST_TYPES,
//     list_types: types
// })

// export const getListTypes = () => async (dispatch) => {
//     const res = await fetch('/api/list_types')
//     if (res.ok) {
//         const types = await res.json();
//         dispatch(setListTypes(types))
//     }
// }