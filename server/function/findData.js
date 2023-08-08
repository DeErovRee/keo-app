const tables = require("../tables/a6.json")

function FindData(Psr, z1, z2, Pf, Ld) {

    const Params = {}

    const getLd = (Ld) => {

        if (Ld == 0.9 || Ld == 0.5 || Ld == 0.2) {
            Params.rangeLd = [`${Ld}`]
            return;
        }
        if (Ld > 0.5) {
            Params.rangeLd = ["0.9", "0.5"]
        } else {
            Params.rangeLd = ["0.5", "0.2"]
        }
    }

    const getPf = (Pf) => {

        if (Pf == 0.65 || Pf == 0.6 || Pf == 0.5 || Pf == 0.4 || Pf == 0.3) {
            Params.rangePf = [`${Pf}`]
            return;
        }
        if (Pf > 0.6) {
            Params.rangePf = ["0.65", "0.6"]
        }
        if (Pf < 0.6 && Pf > 0.5) {
            Params.rangePf = ["0.6", "0.5"]
        }
        if (Pf < 0.5 && Pf > 0.4) {
            Params.rangePf = ["0.5", "0.4"]
        }
        if (Pf < 0.4) {
            Params.rangePf = ["0.4", "0.3"]
        }
    };

    const getPsr = (Psr) => {

        if (Psr == 0.55 || Psr == 0.50 || Psr == 0.45 || Psr == 0.40) {
            Params.rangePsr = [`${Psr}`]
            return;
        }
        if (Psr > 0.5) {
            Params.rangePsr = ["0.55", "0.50"]
        }
        if (Psr < 0.5 && Psr > 0.45) {
            Params.rangePsr = ["0.50", "0.45"]
        }
        if (Psr < 0.45) {
            Params.rangePsr = ["0.45", "0.40"]
        }

    };

    const getZ1 = (z1) => {
      
        if (z1 == 4 || z1 == 2 || z1 == 0.5) {
            Params.rangeZ1 = [`${z1}`]
            return;
        }
        if (z1 < 2.0) {
            Params.rangeZ1 = ["0.5", "2.0"]
        } else {
            Params.rangeZ1 = ["2.0", "4.0"]
        }
    };

    const getZ2 = (param) => {
        if(param < 0.1) {
            param = '0.1'
        }
        if (param > 4.0) {
            param = '4.0'
        }
        if (param == 4.0 || param == 2.0 || param == 1.5 || param == 1.0 || param == 0.5 || param == 0.1) {
            Params.rangeZ2 = [`${param}`]
            return param;
        }
        if (param < 0.5 && param > 0.1) {
            Params.rangeZ2 = ["0.1", "0.5"]
            return param;
        }
        if (param > 0.5 && param < 1.0) {
            Params.rangeZ2 = ["0.5", "1.0"]
            return param;
        }
        if (param > 1.0 && param < 1.5) {
            Params.rangeZ2 = ["1.0", "1.5"]
            return param;
        }
        if (param > 1.5 && param < 2.0) {
            Params.rangeZ2 = ["1.5", "2.0"]
            return param;
        }
        if (param > 2.0 && param < 4.0) {
            Params.rangeZ2 = ["2.0", "4.0"]
            return param;
        }
        
    };

    const GetNewArr = (arr, paramRange) => {
        const newArr = []
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < paramRange.length; j++) {
                newArr.push(arr[i][paramRange[j]])
            }
        }
        return newArr
    }

    const SliceArr = (arr, paramRange) => {
        const newArr = [];
        if (paramRange.length === 2) {
            const chunkSize = 2;
            for (let i = 0; i < arr.length; i += chunkSize) {
                const chunk = arr.slice(i, i + chunkSize);
                newArr.push(chunk)
            }
        } 
        if (paramRange.length === 1) {
            const chunkSize = 1;
            for (let i = 0; i < arr.length; i += chunkSize) {
                const chunk = arr.slice(i, i + chunkSize);
                newArr.push(chunk)
            }
        }
        return newArr
    }

    const Interpolation = (arr, paramRange, param) => {
        return arr[0] + (param - paramRange[0])*((arr[1] - arr[0]) / (paramRange[1] - paramRange[0]))
    }

    getLd(Ld)
    getPf(Pf)
    getPsr(Psr)
    getZ1(z1)
    const CorrectZ2 = getZ2(z2)
    
    const aDATA = [];
    for (let i = 0; i < Params.rangeLd.length; i++) {
        aDATA.push(tables[Params.rangeLd[i]])
    }
    
    // Получаем исходные данные для интерполяции
    const bDATA = GetNewArr(GetNewArr(GetNewArr(GetNewArr(aDATA, Params.rangePf), Params.rangePsr), Params.rangeZ1), Params.rangeZ2)
    
    // Разбиваем массив на чанки исходя из Z1 и Z2
    const fDATA = []
    if (Params.rangeZ1.length < 2 && Params.rangeZ2.length > 1 || Params.rangeZ2.length < 2 && Params.rangeZ1.length > 1) {
        const chunkSize = 2;
        for (let i = 0; i < bDATA.length; i += chunkSize) {
            const chunk = bDATA.slice(i, i + chunkSize);
            fDATA.push(chunk)
        }
    } 
    if (Params.rangeZ1.length === 1 && Params.rangeZ2.length === 1) {
        const chunkSize = 1;
        for (let i = 0; i < bDATA.length; i += chunkSize) {
            const chunk = bDATA.slice(i, i + chunkSize);
            fDATA.push(chunk)
        }
    } 
    if (Params.rangeZ2.length === 2 && Params.rangeZ1 === 2) {
        const chunkSize = 4;
        for (let i = 0; i < bDATA.length; i += chunkSize) {
            const chunk = bDATA.slice(i, i + chunkSize);
            fDATA.push(chunk)
        }
    }

    // Интерполируем по Z1 и Z2
    const gDATA = []
    for (let i = 0; i < fDATA.length; i++) {
        if (fDATA[i].length === 4) {
            const xy1 = fDATA[i][0] + (CorrectZ2 - Params.rangeZ2[0]) * ((fDATA[i][1] - fDATA[i][0]) / (Params.rangeZ2[1] - Params.rangeZ2[0]))
            const xy2 = fDATA[i][2] + (CorrectZ2 - Params.rangeZ2[0]) * ((fDATA[i][3] - fDATA[i][2]) / (Params.rangeZ2[1] - Params.rangeZ2[0]))
            gDATA.push(Interpolation([xy1, xy2], Params.rangeZ2, CorrectZ2))
        }
        if (fDATA[i].length === 2) {
            if(Params.rangeZ1.length === 2) {
                gDATA.push(Interpolation(fDATA[i], Params.rangeZ1, z1))
            }
            if(Params.rangeZ1.length === 1) {
                gDATA.push(Interpolation(fDATA[i], Params.rangeZ2, z2))
            }
        }
        if (fDATA[i].length === 1) {
            gDATA.push(fDATA[i][0])
        }
    }
    const hDATA = SliceArr(gDATA, Params.rangePsr)

    // Интерполируем по Psr
    const iDATA = []
    for(let i = 0; i < hDATA.length; i++) {
        if(hDATA[i].length === 1) {
            console.log('скипаем интерполяцию')
            iDATA.push(hDATA[i][0])
        } else {
            iDATA.push(Interpolation(hDATA[i], Params.rangePsr, Psr))
        }
    }
    const jDATA = SliceArr(iDATA, Params.rangePf)

    // Интерполируем по Pf
    const kDATA = []
    for(let i = 0; i < jDATA.length; i++) {
        if(jDATA[i].length === 1) {
            kDATA.push(jDATA[i][0])
        } else {
            kDATA.push(Interpolation(jDATA[i], Params.rangePf, Pf)) 
        }
    }

    // Интерполируем по Ld
    let lDATA = null;
    if(Params.rangeLd.length === kDATA.length) {
        lDATA = Interpolation(kDATA, Params.rangeLd, Ld) 
    } else {
        lDATA = kDATA[0]
    }

    return lDATA
}

module.exports = FindData