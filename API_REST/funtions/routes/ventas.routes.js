const { Router } = require("express");
const router = Router();


const admin = require("firebase-admin");
const db = admin.firestore();

router.post("/api/ventas", async (req, res) => {
    try {
        await db
            .collection("ventas")
            .doc("/" + req.body.id + "/")
            .create({
     
                
                valor_total: req.body.valor_total,
                identificador: req.body.identificador,
                cantidad: req.body.cantidad,
                precio_unitario: req.body.precio_unitario,
                fecha_venta: req.body.fecha_venta,
                id_cliente: req.body.id_cliente,
                nombre_cliente: req.body.nombre_cliente,
                vendedor : req.body.vendedor 

            });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/api/ventas", async (req, res) => {
    try {
        let query = db.collection("ventas");
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;

        const response = docs.map((doc) => ({
            id: doc.id,
            total_ventas: doc.data().total_ventas,
            valor_total: doc.data().valor_total,
            identificador: doc.data().identificador,
            cantidad: doc.data().cantidad,
            precio_unitario: doc.data().precio_unitario,
            fecha_venta: doc.data().fecha_venta,
            id_cliente: doc.data().id_cliente,
            nombre_cliente: doc.data().nombre_cliente,
            vendedor : doc.data().vendedor
        }));

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.delete("/api/ventas/:venta_id", async (req, res) => {
    try {
        const doc = db.collection("ventas").doc(req.params.venta_id);
        await doc.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.put("/api/ventas/:venta_id", async (req, res) => {
    try {
        const document = db.collection("ventas").doc(req.params.venta_id);
        await document.update({
            
        
            valor_total: req.body.valor_total,
            identificador: req.body.identificador,
            cantidad: req.body.cantidad,
            precio_unitario: req.body.precio_unitario,
            fecha_venta: req.body.fecha_venta,
            id_cliente: req.body.id_cliente,
            nombre_cliente: req.body.nombre_cliente,
            vendedor : req.body.vendedor
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

module.exports = router