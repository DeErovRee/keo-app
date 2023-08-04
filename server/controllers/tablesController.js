const ApiError = require("../error/ApiError")
const tables = require("../tables/a6.json")
const FindData = require("../function/findData")

class TablesController {
    async get(req, res, next) {
        
        let {Psr, z1, z2, Pf, Ld} = req.query
        if (!Psr || !z1 || !z2 || !Pf || !Ld) {
            return next(ApiError.badRequest("Не хватает параметров"))
        }

        res.json({
            "Psr": Psr,
            "z1": z1,
            "z2": z2,
            "Pf": Pf,
            "Ld": Ld,
            "Kzd": FindData(Psr, z1, z2, Pf, Ld),
        })
    }
}

module.exports = new TablesController()