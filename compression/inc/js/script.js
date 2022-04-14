Raphael.fn.line = function(startX, startY, endX, endY){
    return this.path('M' + startX + ' ' + startY + ' L' + endX + ' ' + endY);
};

const RADIUS = 24;
const COLOR_NODE_FILL = '#F1F1F1';

function decodeTree(data, edge) {
  if (typeof data === "string") {
    data = data.split('');
  }
  var val = data.shift();
  var node = {};
  if (edge !== undefined) {
    node.edge = edge;
  }
  if (val == '1') {
    node.left = decodeTree(data, 0);
    node.right = decodeTree(data, 1);
  }
  if (val == '0') {
    return {value:data.shift(), edge:edge};
  } 
  return node;
}

function generateTree(str) {
  var counts = {}, letters = {}, node = {}, right, left;

  // compute occurrence of letters
  str.split('').forEach((v) => (counts[v] = (counts[v])? ++counts[v] : 1));
  // generate node letters
  letters = Object.keys(counts)
         .map(function(elt) {return {value: elt, count: counts[elt]};});
  while(letters.length != 1) {
    letters.sort(function(a,b) {
      if (a.count < b.count) return -1;
      if (a.count > b.count) return 1;
      if (a.value && b.value) {
        if (a.value < b.value) return -1;
        if (a.value > b.value) return 1;
        return 0;
      }
    });
    left = letters.shift();
    right = letters.shift();
    left.edge = 0;
    right.edge = 1;
    node = {left:left, right:right, count: left.count + right.count}
    letters.unshift(node);
  }

  return letters.shift();
}

function computeTree(node, parent) {
  if (parent !== undefined) {
    node.parent = parent;
    node.depth = parent.depth + 1;
  } else {
    node.depth = 0;
  }
  if (node.left !== undefined) {
    computeTree(node.left, node);
  }
  if (node.right !== undefined) {
    computeTree(node.right, node);
  }
  return node;
}

function getNbChildren(node) {
  if (node !== undefined) {
    return 1+getNbChildren(node.left)+getNbChildren(node.right);
  }
  return 0;
}

function getNbLeaf(node) {
  if (node !== undefined) {
    if (node.value !== undefined) {
      return 1+getNbChildren(node.left)+getNbChildren(node.right);
    } else {
      return getNbChildren(node.left)+getNbChildren(node.right);
    }
  }
  return 1;
}

function getMaxDepth(node) {
  while(node.parent !== undefined) {
    node = node.parent
  }
  return getDepth(node);
}

function getDepth(node) {
  if (node !== undefined) {
    var left = getDepth(node.left),
        right = getDepth(node.right);

    return Math.max(node.depth, left, right);
  }
  return 0;
}

function drawDict(paper, dict) {
  var y = paper.height - 12;
  
  Object.keys(dict).sort(function(a,b) {
    if (a === 'α') {
      return -1;
    } else if (b === 'α') {
      return 1;
    } else {
      return a > b;
    }
  }).forEach(function(key) {
    drawText(paper, 0, y, key + ':' + dict[key], {
      'text-anchor': 'start'
    });
    y -= 24;
  });
}

function drawText(paper, x, y, text, attrs) {
  return paper.text(x, y, text).attr(Object.assign({
    'font-size': '24px',
    'font-family': 'Verdana',
    'text-anchor': 'middle'
  }, attrs));
}

function drawTree(paper, node) {
  if (node) {
    var w, h, pos = 0;
    if (node.parent === undefined) {
      w = paper.width / 2;
      h = RADIUS+1
    } else {
      pos = (node.parent.left === node) ? -1 : 1;
      //dw = (paper.width/(2**(getMaxDepth(node)+1)) * getNbChildren(node));
      //dw = (RADIUS * getNbLeaf(node.parent))*(getNbLeaf(node)/getNbLeaf(node.parent));
      //dw = RADIUS * getNbLeaf(node);
      dw = (paper.width/(2**(node.depth+1)));
      if (dw < RADIUS) dw = RADIUS;
      w = node.parent.ui.circle.attr('cx') + pos * dw;
      h = node.parent.ui.circle.attr('cy') + RADIUS*3;
    }
    node.ui = {};
    node.ui.circle = paper.circle(w, h, RADIUS).attr({
      'fill': COLOR_NODE_FILL
    });
    if (node.count !== undefined) {
      node.ui.count = drawText(paper, w, h, node.count);
    }
    var x2, y2;
    x2 = node.ui.circle.attr('cx');
    y2 = node.ui.circle.attr('cy');
    if (node.edge !== undefined) {
      var x1, y1;
      x1 = node.parent.ui.circle.attr('cx');
      y1 = node.parent.ui.circle.attr('cy');
      l = Math.sqrt((y2-y1)**2+((x2-x1)**2));
      dx = (x2 - x1)*RADIUS/l;
      dy = (y2 - y1)*RADIUS/l;
      node.ui.line = paper.line(x1+dx, y1+dy, x2-dx, y2-dy);
      node.ui.edge = drawText(paper, (x2+x1)/2+pos*12, (y2+y1)/2-6, node.edge, {
        'stroke': '#C1FFB7'
      });
    }
    if (node.value !== undefined) {
      node.ui.value = drawText(paper, x2, y2+RADIUS+12, node.value, {
        'stroke': '#FFC1B7'
      });
    }
    drawTree(paper, node.left);
    drawTree(paper, node.right);
  }
}

function dictTree(tree, current) {
  if (current === undefined) current = "";
  if (tree) {
    if (tree.edge !== undefined) {
      current += tree.edge;
    }
    if (tree.value !== undefined) {
      var obj = {};
      if (current === "") current = 0;
      obj[tree.value] = current;
      return obj;
    } else {
      return Object.assign(dictTree(tree.left, current), dictTree(tree.right, current));
    }
  }
}

window.addEventListener('load', (event) => {
  document.querySelectorAll('.src-tree, .src-small-tree, .src-tree-decode').forEach(function(elt) {
    var str = elt.innerText.trim();
    var canvas = document.createElement('div');
    var isDecoding = elt.classList.contains('src-tree-decode')
    var isSmall = elt.classList.contains('src-small-tree')
    document.body.appendChild(canvas);
    if (isSmall) {
      canvas.classList.add('small-tree');
      elt = elt.parentNode;
    } else {
      canvas.classList.add('tree');
      elt = elt.parentNode;
    }
    elt.innerHTML = '';
    var style = window.getComputedStyle(canvas);
    var paper = Raphael(canvas, parseInt(style.width), parseInt(style.height));
    var tree = {};
    if (isDecoding) {
      tree = decodeTree(str);
    } else {
      tree = generateTree(str);
    }
    tree = computeTree(tree);
    drawTree(paper, tree);
    if (!isSmall) {
      drawDict(paper, dictTree(tree));
    }
    elt.appendChild(canvas);
    if (isSmall) {
      canvas.parentNode.classList.add('small-tree');
    }
  });
});



