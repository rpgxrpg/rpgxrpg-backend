import express from 'express'
import usuarioRoutes from "./modules/usuarios/presentation/usuario.routes"

const app = express()
app.use(express.json())
app.use("/api/usuarios", usuarioRoutes)

export default app