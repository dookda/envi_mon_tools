let loadMax = (param, start, end, val, dt) => {
    let ts = { param, start, end }
    axios.post('/api/getmax', ts).then(r => {
        document.getElementById(val).innerHTML = r.data.data[0][param] + " mm/s";
        document.getElementById(dt).innerHTML = r.data.data[0]["dt"] + " น.";
    })
}

let loadData = () => {

    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    loadMax('tranppv', start, end, "tval", "tdt")
    loadMax('vertppv', start, end, "vval", "vdt")
    loadMax('longppv', start, end, "lval", "ldt")
}

let start = document.getElementById("start").value = "2021-09-03";
let end = document.getElementById("end").value = "2021-09-04";
loadMax('tranppv', start, end, "tval", "tdt")
loadMax('vertppv', start, end, "vval", "vdt")
loadMax('longppv', start, end, "lval", "ldt")


