/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

// Green Rocky Road by aren Dalton
// var poem = [ 'when','i', 'go', 'to', 'bal', 'ti', 'more', 'need', 'no', 'car', 'pet', 'on', 'my', 'floor', 'get', 'your', 'coat', 'and', 'follow' , 'me', 'i', 'know', 'a', 'man', 'in', 'ga', 'li', 'lee' ];
var poem = [ 'し','ば', 'ら', 'く', 'じ', 'か', 'ん', 'を', 'no', 'car', 'pet', 'on', 'my', 'floor', 'get', 'your', 'coat', 'and', 'follow' , 'me', 'i', 'know', 'a', 'man', 'in', 'ga', 'li', 'lee' ];

/*




*/

var wordIndex = 0;
// shuffle(poem);

var maxPuffAge = 48,
    initialPuffWidth = 36,            // px
    puffHeight = 34,
    windowWidth,
    windowHeight,
    maximumInitialPuffVelocityX = 15, // px/second
    initialPuffVelocityY = -34;       // px/second

var windSpeed = 5; // negative: left, positive: right

// var puffs = []; // array of puff objects
/* a puff is an object {element, v_x, v_y} */
var elements = {smoke_stack: document.querySelector('#smoke-stack'), incense_stick: document.querySelector('#incense-stick'), puffs: document.querySelectorAll('.smoke-puff')};
var incenseTip;

var initializeMeasurements = function() {
  incenseTip = { x: elements.incense_stick.getBoundingClientRect().left, y: elements.incense_stick.getBoundingClientRect().top };
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

var createPuff = function() {
  var newPuffElement = document.createElement('div');
  newPuffElement.innerText = poem[wordIndex];
  wordIndex = (wordIndex + 1) % poem.length;
  newPuffElement.className = 'smoke-puff';
  newPuffElement.style.width = (-6 + Math.random()*12) + initialPuffWidth + 'px';
  newPuffElement.style.left = incenseTip.x + 'px';
  newPuffElement.style.top = incenseTip.y + 'px';
  newPuffElement.style.opacity = 1;
  newPuffElement.dataset.age = 0;
  // newPuffElement.dataset.vx = Math.ceil( Math.random() * maximumInitialPuffVelocityX );
  newPuffElement.dataset.vx = windSpeed;
  newPuffElement.dataset.vy = initialPuffVelocityY;
  elements.smoke_stack.appendChild(newPuffElement);
}

var update = function() {

  // update wind speed
  // var param1 =  -1 * Math.abs(windSpeed / 50) + 0.49; // 0 to 0.49
  var offset = -windSpeed / 160 - 0.01
  var param = Math.random() + offset; // 0 to 1
  if (param > 0.5) {
    windSpeed += 5;
  } else {
    windSpeed -= 5;
  }

  // console.log(windSpeed);

  // update each puff's position and width
  console.log('puff');
  var puffs = document.querySelectorAll('.smoke-puff');
  for (var i = 0; i < puffs.length; i++) {
    var puff = puffs[i];

    // increment age
    var age = parseInt(puff.dataset.age) + 1;
    puff.dataset.age = age;
    // destroy old puffs
    if (age > maxPuffAge) {
      puff.parentNode.removeChild(puff);
    }

    // update opacity
    var opacity = 1 - age / maxPuffAge;
    puff.style.opacity = opacity;

    // calculate new width, save height
    var height = puffHeight;
    var width = parseFloat(puff.style.width);
    width += -6 + Math.floor((Math.random() * 24));
    puff.style.width = width + 'px';

    // calculate new speed
    var vx = parseFloat(puff.dataset.vx);
    // var vx = windSpeed;
    // calculate new position
    var left = parseFloat(puff.style.left) + vx;
    var top = parseFloat(puff.style.top) + parseFloat(puff.dataset.vy);
    // reverse direction on overflow
    if (left < 0.5*width) {
      left -= left - 0.5*width;
      puff.dataset.vx = -0.33 * vx;
    } else if (left + 0.5*width > windowWidth) {
      left -= (left + 0.5*width - windowWidth);
      puff.dataset.vx = -0.33 * vx;
    }
    if (top < height) {
      top -= top - height;
      puff.dataset.vy = -0.33 * parseFloat(puff.dataset.vy);
    } else if (top > windowHeight) {
      top -= top - windowHeight;
      puff.dataset.vy = -0.33 * parseFloat(puff.dataset.vy);
    }
    // assign new position
    puff.style.left = left + 'px';
    puff.style.top = top + 'px';
  }

  createPuff();
}

window.addEventListener('resize', function() {
  initializeMeasurements();
});

initializeMeasurements();
setInterval(update, 1000);