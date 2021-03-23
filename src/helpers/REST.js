import Cookie from 'js-cookie'
export function proccessRequestError(store, error) {
    if (error !== undefined && error.response !== undefined) {
        store.commit("modal", [
            true,
            JSON.stringify(error.response.data),
            {},
        ]);

    }
}


export const headers = {
    'X-CSRFToken': Cookie.get("csrftoken"),
    "Content-Type": "application/json"
}