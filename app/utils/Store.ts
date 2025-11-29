import auth from "~/stores/auth";

class Store {
  get auth() {
    return auth();
  }
}

const store = new Store();
export default store;
