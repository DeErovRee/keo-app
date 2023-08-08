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

    let CorrectZ2 = z2;
    const getZ2 = (z2) => {
        if (z2 > 4) {
            CorrectZ2 = "4.0";
        }
        if (CorrectZ2 == 4.0 || CorrectZ2 == 2.0 || CorrectZ2 == 1.5 || CorrectZ2 == 1.0 || CorrectZ2 == 0.5 || CorrectZ2 == 0.1) {
            Params.rangeZ2 = [`${CorrectZ2}`]
            return;
        }
      
        if (CorrectZ2 < 0.5) {
            Params.rangeZ2 = ["0.1", "0.5"]
        }
        if (CorrectZ2 >= 0.5 && CorrectZ2 < 1.0) {
            Params.rangeZ2 = ["0.5", "1.0"]
        }
        if (CorrectZ2 >= 1.0 && CorrectZ2 < 1.5) {
            Params.rangeZ2 = ["1.0", "1.5"]
        }
        if (CorrectZ2 >= 1.5 && CorrectZ2 <= 2.0) {
            Params.rangeZ2 = ["1.5", "2.0"]
        }
        if (CorrectZ2 > 2.0) {
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
            fDATA.push(chunk)
        }
    } 
    if (Params.rangeZ1.length === 1 && Params.rangeZ2.length === 1) {
        const chunkSize = 1;
        for (let i = 0; i < eDATA.length; i += chunkSize) {
            const chunk = eDATA.slice(i, i + chunkSize);
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
        if (fDATA[i].length === 4) {
            const xy1 = fDATA[i][0] + (CorrectZ2 - Params.rangeZ2[0]) * ((fDATA[i][1] - fDATA[i][0]) / (Params.rangeZ2[1] - Params.rangeZ2[0]))
            const xy2 = fDATA[i][2] + (CorrectZ2 - Params.rangeZ2[0]) * ((fDATA[i][3] - fDATA[i][2]) / (Params.rangeZ2[1] - Params.rangeZ2[0]))
            gDATA.push(xy1 + (z1 - Params.rangeZ1[0]) * ((xy2 - xy1) / (Params.rangeZ1[1] - Params.rangeZ1[0])))
        }
        if (fDATA[i].length === 2) {
            if(Params.rangeZ1.length === 2) {
                gDATA.push(fDATA[i][0] + (Params.rangeZ1[1] - Params.rangeZ1[0])*((fDATA[i][1] - fDATA[i][0]) / (z1 - Params.rangeZ1[0])))
            }
            if(Params.rangeZ1.length === 1) {
                gDATA.push(fDATA[i][0] + (Params.rangeZ2[1] - Params.rangeZ2[0])*((fDATA[i][1] - fDATA[i][0]) / (CorrectZ2 - Params.rangeZ2[0])))
            }
        }
        if (fDATA[i].length === 1) {
            gDATA.push(fDATA[i][0])
        }
    }

    const hDATA = []
    if (Params.rangePsr.length === 2) {
        const chunkSize = 2;
        for (let i = 0; i < gDATA.length; i += chunkSize) {
            const chunk = gDATA.slice(i, i + chunkSize);
            hDATA.push(chunk)
        }
    } 
    if (Params.rangePsr.length === 1) {
        const chunkSize = 1;
        for (let i = 0; i < gDATA.length; i += chunkSize) {
            const chunk = gDATA.slice(i, i + chunkSize);
            hDATA.push(chunk)
        }
    }

    const iDATA = []
    for(let i = 0; i < hDATA.length; i++) {
        if(hDATA[i].length === 1) {
            iDATA.push(hDATA[i][0])
        } else {
            iDATA.push(hDATA[i][0] + (Psr - Params.rangePsr[1])*((hDATA[i][1] - hDATA[i][0]) / (Psr - Params.rangePsr[1])))
        }
    }

    const jDATA = []
    if (Params.rangePf.length === 2) {
        const chunkSize = 2;
        for (let i = 0; i < iDATA.length; i += chunkSize) {
            const chunk = iDATA.slice(i, i + chunkSize);
            jDATA.push(chunk)
        }
    } 
    if (Params.rangePf.length === 1) {
        const chunkSize = 1;
        for (let i = 0; i < iDATA.length; i += chunkSize) {
            const chunk = iDATA.slice(i, i + chunkSize);
            jDATA.push(chunk)
        }
    }

    const kDATA = []
    for(let i = 0; i < jDATA.length; i++) {
        if(jDATA[i].length === 1) {
            kDATA.push(jDATA[i][0])
        } else {
            kDATA.push(jDATA[i][0] + (Pf - Params.rangePf[0])*((jDATA[i][1] - jDATA[i][0]) / (Pf - Params.rangePf[0])))
        }
    }

    const lDATA = []
    if(Params.rangeLd.length === kDATA.length) {
        lDATA.push(kDATA[0] + (Ld - Params.rangeLd[0])*((kDATA[1] - kDATA[0]) / (Params.rangeLd[1] - Params.rangeLd[0])))
    } else {
        lDATA.push(kDATA[0])
    }

    return lDATA
}

module.exports = FindData