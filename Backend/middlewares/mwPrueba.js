export default (req, res, next) => {
    console.log("Creando Usuario");
    next()  //siempre al final del Middlewware se debe llamar un next
}