import Localbase from "localbase";

let localDb = new Localbase("db");

localDb.config.debug = false;

export default localDb;
