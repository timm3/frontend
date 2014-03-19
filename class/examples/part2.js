function drawWithKinetic(coordX, coordY, boxWidth, fillcol, stage)
{
      var layer = new Kinetic.Layer();

      var rect = new Kinetic.Rect({
        x: coordX,
        y: coordY,
        width: boxWidth,
        height: 45,
        fill: fillcol,
        stroke: 'grey',
        strokeWidth: 1
      });

      // add the shape to the layer
      layer.add(rect);

      // add the layer to the stage
      stage.add(layer);
}