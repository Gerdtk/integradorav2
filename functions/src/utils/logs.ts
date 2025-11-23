//Crear Log de CRUD de Plantas (despues junto a mobiliario, IoT, eventos, etc)
export const logPlantaCreada = (plantaId: string, nombre: string) => {
  console.log(`Planta creada: ID=${plantaId}, Nombre=${nombre}`);
}
export const logPlantaActualizada = (plantaId: string, nombre: string) => {
  console.log(`Planta actualizada: ID=${plantaId}, Nombre=${nombre}`);
}
export const logPlantaEliminada = (plantaId: string) => {
  console.log(`Planta eliminada: ID=${plantaId}`);
}
export const logErrorPlanta = (action: string, error: any) => {
  console.error(`Error al ${action} la planta:`, error);
}
//Esto va ir en mobiliarioRoutes.ts y plantasRoutes.ts para registrar logs de creacion, actualizacion y eliminacion de plantas y mobiliario respectivamente.