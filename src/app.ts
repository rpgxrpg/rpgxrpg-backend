import express from 'express'
import usuarioRoutes from "./modules/usuarios/presentation/usuario.routes"
import campanhaRoutes from "./modules/campanhas/presentation/campanha.routes"

const app = express()
app.use(express.json())
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/campanhas", campanhaRoutes)

export default app