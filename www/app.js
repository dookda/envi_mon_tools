let showChart = (dat, div) => {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = dat;

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";


    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value1";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // var series2 = chart.series.push(new am4charts.LineSeries());
    // series2.dataFields.valueY = "value2";
    // series2.dataFields.dateX = "date";
    // series2.strokeWidth = 2;
    // series2.strokeDasharray = "3,4";
    // series2.stroke = series.stroke;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    // chart.scrollbarY = new am4core.Scrollbar();
    // chart.scrollbarY.parent = chart.leftAxesContainer;
    // chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    // chart.scrollbarX = new am4core.Scrollbar();

    // var scrollbarX2 = new am4core.Scrollbar();
    // chart.scrollbarX = scrollbarX2;

    // Add vertical scrollbar
    // chart.scrollbarY2 = new am4core.Scrollbar();
    // chart.scrollbarY2.marginLeft = 0;

    // Add cursor
    // chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomX";
    // chart.cursor.lineX.disabled = true;


    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;


}

axios.get("http://localhost:3000/api/get-vibrate").then(r => {
    // console.log(r.data.data);
    let dat = [];
    r.data.data.map(i => {
        // console.log(i);

        dat.push({
            date: i.dt,
            value1: Number(i.tranppv)
        })

    })

    setTimeout(() => {
        showChart(dat, "tranppv")
        // console.log(dat);
    }, 1000)

})

