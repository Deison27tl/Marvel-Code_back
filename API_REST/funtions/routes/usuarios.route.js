const { Router } = require("express");
const router = Router();
const admin = require("firebase-admin");
const db = admin.firestore();


router.post("/api/usuarios", async (req, res) => {
    try {
        await db
            .collection("usuarios")
            .doc("/" + req.body.id + "/")
            .create({
                nombre: req.body.nombre,
                email: req.body.email,
                rol: req.body.rol,
                estado: req.body.estado
            });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/api/usuarios", async (req, res) => {
    try {
        let query = db.collection("usuarios");
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;

        const response = docs.map((doc) => ({
            id: doc.id,
            nombre: doc.data().nombre,
            email: doc.data().email,
            rol: doc.data().rol,
            estado: doc.data().estado,
        }));

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.delete("/api/usuarios/:user_id", async (req, res) => {
    try {
        const doc = db.collection("usuarios").doc(req.params.user_id);
        await doc.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.put("/api/usuarios/:user_id", async (req, res) => {
    try {
        const document = db.collection("usuarios").doc(req.params.user_id);
        await document.update({
            nombre: req.body.nombre,
            email: req.body.email,
            rol: req.body.rol,
            estado: req.body.estado
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

module.exports = router