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

    const getZ2 = (z2) => {

        if (z2 == 4.0 || z2 == 2.0 || z2 == 1.5 || z2 == 1.0 || z2 == 0.5 || z2 == 0.1) {
            Params.rangeZ2 = [`${z2}`]
            return;
        }
      
        if (z2 < 0.5) {
            Params.rangeZ2 = ["0.1", "0.5"]
        }
        if (z2 >= 0.5 && z2 < 1.0) {
            Params.rangeZ2 = ["0.5", "1.0"]
        }
        if (z2 >= 1.0 && z2 < 1.5) {
            Params.rangeZ2 = ["1.0", "1.5"]
        }
        if (z2 >= 1.5 && z2 <= 2.0) {
            Params.rangeZ2 = ["1.5", "2.0"]
        }
        if (z2 > 2.0) {
            Params.rangeZ2 = ["2.0", "4.0"]
        }
    };

    getLd(Ld)
    getPf(Pf)
    getPsr(Psr)
    getZ1(z1)
    getZ2(z2)

    const aDATA = [];
    for (let i = 0; i < Params.rangeLd.length; i++) {
        aDATA.push(tables[Params.rangeLd[i]])
    }

    const bDATA = []
    for (let i = 0; i < aDATA.length; i++) {
        for (let j = 0; j < Params.rangePf.length; j++) {
            bDATA.push(aDATA[i][Params.rangePf[j]])
        }
    }

    const cDATA = []
    for (let i = 0; i < bDATA.length; i++) {
        for (let j = 0; j < Params.rangePsr.length; j++) {
            cDATA.push(bDATA[i][Params.rangePsr[j]])
        }
    }

    const dDATA = []
    for (let i = 0; i < cDATA.length; i++) {
        for (let j = 0; j < Params.rangeZ1.length; j++) {
            dDATA.push(cDATA[i][Params.rangeZ1[j]])
        }
    }

    const eDATA = []
    for (let i = 0; i < dDATA.length; i++) {
        for (let j = 0; j < Params.rangeZ2.length; j++) {
            eDATA.push(dDATA[i][Params.rangeZ2[j]])
        }
    }

    const fDATA = []
    if (Params.rangeZ1.length < 2 && Params.rangeZ2.length > 1 || Params.rangeZ2.length < 2 && Params.rangeZ1.length > 1) {
        const chunkSize = 2;
        for (let i = 0; i < eDATA.length; i += chunkSize) {
            const chunk = eDATA.slice(i, i + chunkSize);
            console.log(chunk)
            fDATA.push(chunk)
        }
    } 
    if (Params.rangeZ1.length === 1 && Params.rangeZ2.length === 1) {
        const chunkSize = 1;
        for (let i = 0; i < eDATA.length; i += chunkSize) {
            const chunk = eDATA.slice(i, i + chunkSize);
            console.log(chunk)
            fDATA.push(chunk)
        }
    } else {
        const chunkSize = 4;
        for (let i = 0; i < eDATA.length; i += chunkSize) {
            const chunk = eDATA.slice(i, i + chunkSize);
            fDATA.push(chunk)
        }
    }

    const gDATA = []
    for (let i = 0; i < fDATA.length; i++) {
        console.log(fDATA[i])
        if (fDATA[i].length === 4) {
            const xy1 = fDATA[i][0] + ( z2 - Params.rangeZ2[0] ) * ((fDATA[i][1] - fDATA[i][0]) / (Params.rangeZ2[1] - Params.rangeZ2[0]))
            const xy2 = fDATA[i][2] + ( z2 - Params.rangeZ2[0] ) * ((fDATA[i][3] - fDATA[i][2]) / (Params.rangeZ2[1] - Params.rangeZ2[0]))
            gDATA.push(xy1 + (z1 - Params.rangeZ1[1]) * ((xy2 - xy1) / (Params.rangeZ1[1]) - (Params.rangeZ1[0])))
        }
        if (fDATA[i].length === 2) {
            
        }
    }



    return gDATA
}

module.exports = FindData