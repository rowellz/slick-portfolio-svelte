import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const numPointsKey = 'numPoints';
const speedKey = 'speed';
const numRingsKey = 'numRings';
const sizeKey = 'size';
const ringSizeKey = 'ringSize'
const colorKey = 'color';
const isRainbowKey = 'isRainbow';
const isAnimatingKey = 'isAnimating';
const animationSpeedKey = 'animationSpeed';
const isPointSizeAnimatingKey = 'isPointSizeAnimating';
const pointSizeAnimatingSpeedKey = 'pointSizeAnimatingSpeed';
const isRingCountAnimatingKey = 'isRingCountAnimating';
const ringCountAnimatingSpeedKey = 'ringCountAnimatingSpeed';
const isPointCountAnimatingKey = 'isPointCountAnimating';
const pointCountAnimatingSpeedKey = 'pointCountAnimatingSpeed';

export const numPoints = writable(browser ? (localStorage.getItem(numPointsKey) ? parseInt(localStorage.getItem(numPointsKey), 10) : 10) : 10);

export const speed = writable(browser ? (localStorage.getItem(speedKey) ? parseFloat(localStorage.getItem(speedKey)) : 0.000075) : 0.000075);

export const numRings = writable(browser ? (localStorage.getItem(numRingsKey) ? parseInt(localStorage.getItem(numRingsKey), 10) : 400) : 400);

export const size = writable(browser ? (localStorage.getItem(sizeKey) ? parseFloat(localStorage.getItem(sizeKey)) : 0.3) : 0.3);

export const ringSize = writable(browser ? (localStorage.getItem(ringSizeKey) ? parseInt(localStorage.getItem(ringSizeKey)) : 12) : 12);

export const color = writable(browser ? (localStorage.getItem(colorKey) ? localStorage.getItem(colorKey)?.toString() : '#ffffff') : '#ffffff');

export const isRainbow = writable(browser ? (localStorage.getItem(isRainbowKey) ? localStorage.getItem(isRainbowKey) === 'true' : true) : true);

export const isAnimating = writable(browser ? (localStorage.getItem(isAnimatingKey) ? localStorage.getItem(isAnimatingKey) === 'true' : false) : false);

export const animationSpeed = writable(browser ? (localStorage.getItem(animationSpeedKey) ? parseFloat(localStorage.getItem(animationSpeedKey)) : 100) : 100);

export const isPointSizeAnimating = writable(browser ? (localStorage.getItem(isPointSizeAnimatingKey) ? localStorage.getItem(isPointSizeAnimatingKey) === 'true' : false) : false);

export const pointSizeAnimatingSpeed = writable(browser ? (localStorage.getItem(pointSizeAnimatingSpeedKey) ? parseFloat(localStorage.getItem(pointSizeAnimatingSpeedKey)) : 100) : 100);

export const isRingCountAnimating = writable(browser ? (localStorage.getItem(isRingCountAnimatingKey) ? localStorage.getItem(isRingCountAnimatingKey) === 'true' : false) : false);

export const ringCountAnimatingSpeed = writable(browser ? (localStorage.getItem(ringCountAnimatingSpeedKey) ? parseFloat(localStorage.getItem(ringCountAnimatingSpeedKey)) : 100) : 100);

export const isPointCountAnimating = writable(browser ? (localStorage.getItem(isPointCountAnimatingKey) ? localStorage.getItem(isPointCountAnimatingKey) === 'true' : false) : false);

export const pointCountAnimatingSpeed = writable(browser ? (localStorage.getItem(pointCountAnimatingSpeedKey) ? parseFloat(localStorage.getItem(pointCountAnimatingSpeedKey)) : 100) : 100);

numPoints.subscribe((value) => {
  if (browser) {
    localStorage.setItem(numPointsKey, value.toString());
  }
});

speed.subscribe((value) => {
  if (browser) {
    localStorage.setItem(speedKey, value.toString());
  }
});

numRings.subscribe((value) => {
    if (browser) {
      localStorage.setItem(numRingsKey, value.toString());
    }
  });

size.subscribe((value) => {
    if (browser) {
      localStorage.setItem(sizeKey, value.toString());
    }
});

ringSize.subscribe((value) => {
  if (browser) {
    localStorage.setItem(ringSizeKey, value.toString());
  }
});

color.subscribe((value) => {
  if (browser) {
    localStorage.setItem(colorKey, value.toString());
  }
});  

isRainbow.subscribe((value) => {
  if (browser) {
    localStorage.setItem(isRainbowKey, value.toString());
  }
});

isAnimating.subscribe((value) => {
  if (browser) {
    localStorage.setItem(isAnimatingKey, value.toString());
  }
});

animationSpeed.subscribe((value) => {
  if (browser) {
    localStorage.setItem(animationSpeedKey, value.toString());
  }
});

isPointSizeAnimating.subscribe((value) => {
  if (browser) {
    localStorage.setItem(isPointSizeAnimatingKey, value.toString());
  }
});

pointSizeAnimatingSpeed.subscribe((value) => {
  if (browser) {
    localStorage.setItem(pointSizeAnimatingSpeedKey, value.toString());
  }
});

isRingCountAnimating.subscribe((value) => {
  if (browser) {
    localStorage.setItem(isRingCountAnimatingKey, value.toString());
  }
});

ringCountAnimatingSpeed.subscribe((value) => {
  if (browser) {
    localStorage.setItem(ringCountAnimatingSpeedKey, value.toString());
  }
});

isPointCountAnimating.subscribe((value) => {
  if (browser) {
    localStorage.setItem(isPointCountAnimatingKey, value.toString());
  }
});

pointCountAnimatingSpeed.subscribe((value) => {
  if (browser) {
    localStorage.setItem(pointCountAnimatingSpeedKey, value.toString());
  }
});

let animationInterval;

function startAnimation() {
  const step = 1;
  const maxRingSize = 20;
  const minRingSize = 1;
  let direction = 1;

  // Clear existing interval if any
  clearInterval(animationInterval);

  // Subscribe to the animationSpeed store
  const unsubscribe = animationSpeed.subscribe(speed => {
    // Ensure to clear any existing interval before setting a new one
    clearInterval(animationInterval);

    animationInterval = setInterval(() => {
      ringSize.update(currentSize => {
        let newSize = currentSize + step * direction;
        if (newSize >= maxRingSize || newSize <= minRingSize) {
          direction *= -1;
        }
        return Math.max(minRingSize, Math.min(maxRingSize, newSize));
      });
    }, speed);
  });

  // Cleanup on component destroy or when stopping the animation
  return () => {
    clearInterval(animationInterval);
    unsubscribe();
  };
}


function stopAnimation() {
  if (animationInterval !== null) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
}

// Subscribe to isAnimating and start/stop animation based on its value
isAnimating.subscribe(value => {
  if (value) {
    startAnimation();
  } else {
    stopAnimation();
  }
});


let pointSizeAnimationInterval;

function startPointSizeAnimation() {
  const step = 0.1;
  const maxPointSize = 1.5;
  const minPointSize = 0.5;
  let direction = 1;

  // Clear existing interval if any
  clearInterval(pointSizeAnimationInterval);

  // Subscribe to the pointSizeAnimatingSpeed store
  const unsubscribe = pointSizeAnimatingSpeed.subscribe(speed => {
    // Ensure to clear any existing interval before setting a new one
    clearInterval(pointSizeAnimationInterval);

    pointSizeAnimationInterval = setInterval(() => {
      size.update(currentSize => {
        let newSize = currentSize + step * direction;
        if (newSize >= maxPointSize || newSize <= minPointSize) {
          direction *= -1;
        }
        return Math.max(minPointSize, Math.min(maxPointSize, newSize));
      });
    }, speed);
  });

  // Cleanup on component destroy or when stopping the animation
  return () => {
    clearInterval(pointSizeAnimationInterval);
    unsubscribe();
  };
}

function stopPointSizeAnimation() {
  if (pointSizeAnimationInterval !== null) {
    clearInterval(pointSizeAnimationInterval);
    pointSizeAnimationInterval = null;
  }
}

isPointSizeAnimating.subscribe(value => {
  if (value) {
    startPointSizeAnimation();
  } else {
    stopPointSizeAnimation();
  }
});

let ringCountAnimationInterval;

function startRingCountAnimation() {
  const step = 1;
  const maxRingCount = 1000;
  const minRingCount = 100;
  let direction = 1;

  // Clear existing interval if any
  clearInterval(ringCountAnimationInterval);

  // Subscribe to the ringCountAnimatingSpeed store
  const unsubscribe = ringCountAnimatingSpeed.subscribe(speed => {
    // Ensure to clear any existing interval before setting a new one
    clearInterval(ringCountAnimationInterval);

    ringCountAnimationInterval = setInterval(() => {
      numRings.update(currentSize => {
        let newSize = currentSize + step * direction;
        if (newSize >= maxRingCount || newSize <= minRingCount) {
          direction *= -1;
        }
        return Math.max(minRingCount, Math.min(maxRingCount, newSize));
      });
    }, speed);
  });

  // Cleanup on component destroy or when stopping the animation
  return () => {
    clearInterval(ringCountAnimationInterval);
    unsubscribe();
  };
}

function stopRingCountAnimation() {
  if (ringCountAnimationInterval !== null) {
    clearInterval(ringCountAnimationInterval);
    ringCountAnimationInterval = null;
  }
}

isRingCountAnimating.subscribe(value => {
  if (value) {
    startRingCountAnimation();
  } else {
    stopRingCountAnimation();
  }
});

let pointCountAnimationInterval;

function startPointCountAnimation() {
  const step = 1;
  const maxPointCount = 50;
  const minPointCount = 8;
  let direction = 1;

  // Clear existing interval if any
  clearInterval(pointCountAnimationInterval);

  // Subscribe to the pointCountAnimatingSpeed store
  const unsubscribe = pointCountAnimatingSpeed.subscribe(speed => {
    // Ensure to clear any existing interval before setting a new one
    clearInterval(pointCountAnimationInterval);

    pointCountAnimationInterval = setInterval(() => {
      numPoints.update(currentSize => {
        let newSize = currentSize + step * direction;
        if (newSize >= maxPointCount || newSize <= minPointCount) {
          direction *= -1;
        }
        return Math.max(minPointCount, Math.min(maxPointCount, newSize));
      });
    }, speed);
  });

  // Cleanup on component destroy or when stopping the animation
  return () => {
    clearInterval(pointCountAnimationInterval);
    unsubscribe();
  };
}

function stopPointCountAnimation() {
  if (pointCountAnimationInterval !== null) {
    clearInterval(pointCountAnimationInterval);
    pointCountAnimationInterval = null;
  }
}

isPointCountAnimating.subscribe(value => {
  if (value) {
    startPointCountAnimation();
  } else {
    stopPointCountAnimation();
  }
}); 