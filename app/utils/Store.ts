import auth from "~/stores/auth";

class Store {
  get auth() {
    return auth();
  }

  get requestAuthHeader() {
    const headers: { [key: string]: any } = {};

    const _auth = auth();
    if (_auth.auth) headers.authorization = `Bearer ${_auth.auth.token}`;

    return headers;
  }
}

const store = new Store();
export default store;
