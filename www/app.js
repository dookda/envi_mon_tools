var map = L.map('map', {
    center: [16.820378, 100.265787],
    zoom: 13
});

let loadMap = () => {
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    const grod = L.tileLayer('https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var prov = L.tileLayer.wms("http://rti2dss.com:8080/geoserver/th/wms?", {
        layers: 'th:province_4326',
        format: 'image/png',
        transparent: true
    });
    var baseMap = {
        "OSM": osm,
        "แผนที่ถนน": grod,
        "แผนที่ภาพถ่าย": ghyb.addTo(map)
    }
    var overlayMap = {
        "ขอบจังหวัด": prov.addTo(map)
    }
    L.control.layers(baseMap, overlayMap).addTo(map);
}

let showChart = (dat, div, unit) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.data = dat;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = unit;
    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value1";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;
    chart.cursor.behavior = "zoomX";

    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.50;
    dateAxis.keepSelection = true;

}

let loadChart = (start, end) => {
    let ts = { start, end }
    axios.post("http://localhost:3000/api/getvibrate", ts).then(r => {
        // console.log(r.data.data);
        let datTranppv = [];
        let datVertppv = [];
        let datLongppv = [];
        r.data.data.map(i => {
            datTranppv.push({
                date: i.ts,
                value1: Number(i.tranppv)
            })

            datVertppv.push({
                date: i.ts,
                value1: Number(i.vertppv)
            })

            datLongppv.push({
                date: i.ts,
                value1: Number(i.longppv)
            })
        })
        setTimeout(() => {
            showChart(datTranppv, "tranppv", "mm/s")
            showChart(datVertppv, "vertppv", "mm/s")
            showChart(datLongppv, "longppv", "mm/s")
        }, 1000)
    })
}

let loadMax = (param, start, end, val, dt) => {
    let ts = { param, start, end }
    axios.post('/api/getmax', ts).then(r => {
        console.log(r.data.data);
        console.log(r.data.data[0][param]);
        document.getElementById(val).innerHTML = r.data.data[0][param] + " mm/s";
        document.getElementById(dt).innerHTML = r.data.data[0]["dt"];
    })
}


loadMap()
loadChart('2021-09-01', '2021-09-03')

loadMax('tranppv', '2021-09-01', '2021-09-03', "tval", "tdt")
loadMax('vertppv', '2021-09-01', '2021-09-03', "vval", "vdt")
loadMax('longppv', '2021-09-01', '2021-09-03', "lval", "ldt")



