const { Router } = require("express");
const router = Router();
const admin = require("firebase-admin");
const db = admin.firestore();

router.post("/api/productos", async (req, res) => {
    try {
        await db
            .collection("productos")
            .doc("/" + req.body.id + "/")
            .create({
                descripcion: req.body.descripcion,
                valor_unitario: req.body.valor_unitario,
                estado: req.body.estado
            });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/api/productos", async (req, res) => {
    try {
        let query = db.collection("productos");
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;

        const response = docs.map((doc) => ({
            id: doc.id,
            descripcion: doc.data().descripcion,
            valor_unitario: doc.data().valor_unitario,
            estado: doc.data().estado,
        }));

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.delete("/api/productos/:product_id", async (req, res) => {
    try {
        const doc = db.collection("productos").doc(req.params.product_id);
        await doc.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.put("/api/productos/:product_id", async (req, res) => {
    try {
        const document = db.collection("productos").doc(req.params.product_id);
        await document.update({
            descripcion: req.body.descripcion,
            valor_unitario: req.body.valor_unitario,
            estado: req.body.estado
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

module.exports = router