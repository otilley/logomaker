let lines, curve, weight, start, end;

function setup() {
  const preview = select("#canvas-container");
  createCanvas(preview.elt.clientWidth, preview.elt.clientHeight).parent(preview);
  noLoop();
  noFill();

  lines = select("#line-count");
  curve = select("#curve-steepness");
  weight = select("#stroke-width");
  start = select("#gradient-start");
  end = select("#gradient-end");

  selectAll(".controls input").forEach((control) => control.input(updateLogo));
  updateLogo();
}

function updateLogo() {
  select("#line-count-value").html(lines.value());
  select("#curve-value").html(curve.value() + "%");
  select("#stroke-value").html(weight.value());
  redraw();
}

function draw() {
  background("white");
  strokeWeight(weight.value());

  let count = lines.value();
  let bend = min(width, height) * 0.003 * curve.value();
  let firstColor = color(start.value());
  let lastColor = color(end.value());

  for (let direction of [1, -1]) {
    for (let i = 0; i < count; i++) {
      const offset = (i / (count - 1) - 0.5) * height * 0.34 * direction;
      const y = height / 2 + offset;
      stroke(lerpColor(firstColor, lastColor, direction === 1 ? i / (count - 1) : 1 - i / (count - 1)));
      bezier(width * 0.12, y, width * 0.36, y - bend * direction,
        width * 0.64, y - bend * direction, width * 0.88, y);
    }
  }
}

