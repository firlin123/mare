var Cloud = function() {
  this.worker = null;
  this.ctx = null;
}

Cloud.prototype.stop = function() {
  if (this.worker) {
    this.worker.terminate();
    this.worker = null;
  }
}
  
Cloud.prototype.generate = function(target, wordcount, options) {
  if (options === undefined) {
    options = {};
  }
  options.fontfamily = options.fontfamily || 'Times New Roman';
  options.gradienthigh = options.gradienthigh || '#c0c044';
  options.gradientlow = options.gradientlow || '#6969fa';
  options.gradientrandom = options.gradientrandom;
  options.bgcolor = options.bgcolor || '#211e1e';
  options.wordlimit = options.wordlimit || 150;
  options.fontsizemax = options.fontsizemax || 90;
  options.fontsizemin = options.fontsizemin || 16;
  options.padding = options.padding !== undefined ? options.padding : 1;
  options.step = options.step || 0.05;
  options.workersrc = options.workersrc || 'javascripts/worker.js';
  options.progress = options.progress || null;
    
  var
    self = this,
    canvas = document.getElementById(target),
    ctx,
    center,
    
    gradcanvas, gradctx, gradstyle, gradpix, palette,
    
    maxcount, mincount,
    
    slope,
    wordslength,
    words = [],
    bounds = [],
    
    placed = 0,
    worker;
  
  this.ctx = canvas.getContext('2d');
  
  canvas.width = options.canvaswidth || 800;
  canvas.height = options.canvasheight || 800;
  center = [canvas.width / 2, canvas.height / 2];
  
  this.ctx.textAlign = 'center';
  this.ctx.textBaseline = 'middle';
  
  this.ctx.fillStyle = options.bgcolor;
  this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var word in wordcount) {
    words.push([ word, wordcount[word] ]);
  }
  
  if (words.length == 0) {
    if (options.ondone) {
      options.ondone();
    }
    return;
  }
  
  words.sort(function(a, b) {
    return ( (a[1] == b[1]) ? 0 : ((a[1] < b[1]) ? 1 : -1) );
  });
  
  words = words.slice(0, options.wordlimit);
  wordslength = words.length;
  
  maxcount = words[0][1];
  if (wordslength == 1) {
    mincount = 0;
  }
  else {
    mincount = words[wordslength - 1][1];
    for (var i = 0; i < wordslength; ++i) {
      if (words[i][1] < mincount) {
        mincount = words[i][1];
      }
      if (words[i][1] > maxcount) {
        maxcount = words[i][1];
      }
    }
  }
  if (maxcount == mincount) {
    mincount--;
    slope = options.fontsizemax - options.fontsizemin;
  }
  else {
    slope = (options.fontsizemax - options.fontsizemin) / (maxcount - mincount);
  }
  for (var i = 0; i < wordslength; ++i) {
    words[i][1] = slope * (words[i][1] - mincount) + options.fontsizemin;
    this.ctx.font = words[i][1] + "px " + options.fontfamily;
    bounds.push(
      [
        this.ctx.measureText(words[i][0]).width / 2 + options.padding,
        words[i][1] / 2 + options.padding, center[0], center[1]
      ]
    );
  }
  
  gradcanvas = document.createElement('canvas');
  gradcanvas.width = 1;
  gradcanvas.height = wordslength;
  gradctx = gradcanvas.getContext('2d');
  gradient = gradctx.createLinearGradient(0, 0, 0, wordslength);
  gradient.addColorStop(0, options.gradienthigh);
  gradient.addColorStop(1, options.gradientlow);
  gradctx.fillStyle = gradient;
  gradctx.fillRect(0, 0, 1, wordslength);
  palette = gradctx.getImageData(0, 0, 1, wordslength).data;
  
  let path = window.location.pathname;
  if(path.endsWith('.html')) {
    path = path.substring(0, path.lastIndexOf('/'));
  }
  if(!(path.endsWith('/'))) {
    path += '/';
  }
  path += options.workersrc;
  this.worker = new Worker(path);
  
  this.worker.onmessage = function(e) {
    if (e.data.status == 'placed') {
      if (options.gradientrandom) {
        gradpix = (0 | (Math.random() * wordslength)) * 4;
      }
      else {
        gradpix = e.data.id * 4;
      }
      self.ctx.font = words[e.data.id][1] + "px " + options.fontfamily;
      self.ctx.fillStyle = "rgb("
        + palette[gradpix]+ ", "
        + palette[gradpix+1] + ", "
        + palette[gradpix+2] + ")";
      self.ctx.fillText(words[e.data.id][0], e.data.x, e.data.y);
      placed += 1;
      if (options.progress) {
        options.progress.innerHTML = (e.data.id + 1) + '/' + wordslength;
      }
    }
    else if (e.data.status == 'done') {
      self.stop();
      if (options.ondone) {
        options.ondone(placed);
      }
    }
  };
  
  this.worker.postMessage({
    'cmd': 'place',
    'bounds': bounds,
    'canvaswidth': canvas.width,
    'canvasheight': canvas.height,
    'step': options.step
  });  
}
