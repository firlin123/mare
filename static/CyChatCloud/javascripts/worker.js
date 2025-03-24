onmessage = function(e) {
  if (e.data.cmd == 'place') {
    place(
      e.data.bounds,
      e.data.canvaswidth,
      e.data.canvasheight,
      e.data.step
    );
  }
};

onerror = function(e) {
  throw e;
};

function collide(aabb, aabbs) {
  for (var i = aabbs.length - 1; i >= 0; i--) {
    if (Math.abs(aabb[2] - aabbs[i][2]) < (aabb[0] + aabbs[i][0])
      && Math.abs(aabb[3] - aabbs[i][3]) < (aabb[1] + aabbs[i][1])) {
      return true;
    }
  }
  return false;
}

function place(bounds, canvaswidth, canvasheight, step) {
  var
    aabbs = [], spiral = [],
    t, it,
    boundslength = bounds.length,
    wantX, wantY;
  
  boundloop: for (var i = 0; i < boundslength; ++i) {    
    t = it = 0;
    wantX = bounds[i][2];
    wantY = bounds[i][3];
    while (collide(bounds[i], aabbs)) {
      if (spiral[it] === undefined) {
        spiral[it] = [(t * Math.cos(t)), (t * Math.sin(t))]
      }
      bounds[i][2] = spiral[it][0] + wantX;
      bounds[i][3] = spiral[it][1] + wantY;
      if (bounds[i][2] + bounds[i][0] > canvaswidth ||
        bounds[i][3] + bounds[i][1] > canvasheight ||
        bounds[i][2] - bounds[i][0] < 0 || bounds[i][3] - bounds[i][1] < 0) {
        continue boundloop;
      }
      it += 1;
      t += step;
    }
    aabbs.push(bounds[i]);
    postMessage({ 'status': 'placed', 'id': i, 'x': bounds[i][2], 'y': bounds[i][3] });
  }
  postMessage({ 'status': 'done' });
}
