import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger'
import usuarioRoutes from "./modules/usuarios/presentation/usuario.routes"
import campanhaRoutes from "./modules/campanhas/presentation/campanha.routes"
import conviteRoutes from './modules/campanhas/presentation/convite.routes'
import personagemRoutes from './modules/personagens/presentation/personagem.routes'

const app = express()
app.use(express.json())
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/campanhas", campanhaRoutes)
app.use("/api/convites", conviteRoutes)
app.use("/api", personagemRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app