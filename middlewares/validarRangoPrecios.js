const validarRangoPrecios = (req, res, next) => {
    const { minPrice, maxPrice } = req.query;
    const min= parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (minPrice && maxPrice) {
     
        if ((min > max) || (min < 0) ||( max < 0) ||( max<min)) {
        return res.status(401).json({
            msj: "The price range is not valid",
            example: "minPrice < maxPrice",
        });
        }
    }
    next();
    }

module.exports={
    validarRangoPrecios
}
