const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");

const app = express();

const serviceAccount = require("./permissions.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://marvelcodebd-default-rtdb.firebaseio.com"
});

app.use(cors({ origin: true }));

app.get("/hello-world", (req, res) => {
    return res.status(200).json({ message: "Hello World!" });
});

// Routes
app.use(require("./routes/products.routes"));
app.use(require("./routes/ventas.routes"));
app.use(require("./routes/usuarios.route"));

exports.app = functions.https.onRequest(app);