import ol from 'openlayers/dist/ol-debug.js'

const ZoneLayer = isCritical => new ol.layer.Vector({
  source: new ol.source.Vector({
    url: './NWSFireWxZonesManual.geojson', 
    format: new ol.format.GeoJSON()
  }),
  wrapX: false,
  minResolution: 0,
  maxResolution: 10000,
  visible: true,
  style: (feature, resolution) => {
    const style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.1)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgb(183, 183, 183)', 
        width: 2
      }),
      text: new ol.style.Text({
        font: '15px Montserrat, sans-serif',
        fill: new ol.style.Fill({
          color: '#000'
        }),
        stroke: new ol.style.Stroke({
          color: 'rgba(238, 238, 238, .7)',
          width: 3
        })
      })
    })
  	const zone = feature.get('STATE_ZONE')
  	const { status } = isCritical[zone] || ''
    // if(isCritical[zone] == undefined){
    //   console.log('missing, zone', zone,isCritical[zone])
    // }
    // else{
    //   console.log('im hee', isCritical[zone])
    //   if(!status){
    //     console.log('no status', zone, isCritical[zone])
    //   }
    //   else{
    //     console.log('this one owrked', zone, isCritical[zone])
    //   }
    // }
    if(zone == 'NV458'){
      console.log('here', isCritical[zone] )
    }
    var color
    if(isCritical[zone] === undefined){
      console.log('missing zone', zone)
      color = 'rgba(176, 176, 176, 1)'
    }
    else{
      color = !status 
      ? 'rgba(44, 107, 36, 0.8)'
      : {
          'notcritical': 'rgba(44, 107, 36, 0.8)',
          'critical': 'rgba(160, 35, 28, 0.8)',
          'approachingcritical': 'rgba(249, 238, 31, 0.8)',
        }[status] || 'rgba(176, 176, 176, 1)'
    }
    // const color = 'rgba(44, 107, 36, 0.8)'
    // else{
    //   const color = !status 
    //   ? 'rgba(44, 107, 36, 0.8)'
    //   : {
    //       'notcritical': 'rgba(44, 107, 36, 0.8)',
    //       'critical': 'rgba(160, 35, 28, 0.8)',
    //       'approachingcritical': 'rgba(249, 238, 31, 0.8)',
    //     }[status] || 'rgba(176, 176, 176, 1)'
    // }
    style.getFill().setColor(color)
    style.getText().setText(resolution < 5000 ? feature.get('STATE_ZONE') : '');
    return style
  }
})

export default ZoneLayer