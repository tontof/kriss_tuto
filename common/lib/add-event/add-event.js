function addEvent(obj, evType, fn, useCapture) {
  if (obj.addEventListener) {
    obj.addEventListener(evType, fn, useCapture);
  } else {
    if (obj.attachEvent) {
      obj.attachEvent('on' + evType, fn);
    } else {
      window.alert('Handler could not be attached');
    }
  }
}
