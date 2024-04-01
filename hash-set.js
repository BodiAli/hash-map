class Node {
  constructor(key, next = null) {
    this.key = key;
    this.next = next;
  }
}

class HashSet {
  constructor() {
    this.bucketsArray = new Array(16).fill(null);
    this.loadFactor = 0.75;
    this.capacity = this.bucketsArray.length;
    this.occupied = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }

    return hashCode;
  }

  resize() {
    const oldArray = this.bucketsArray;
    this.capacity *= 2;
    this.bucketsArray = new Array(this.capacity).fill(null);
    this.occupied = 0;

    oldArray.forEach((bucket) => {
      let current = bucket;
      while (current !== null) {
        this.set(current.key, current.value);
        current = current.next;
      }
    });
  }

  set(key) {
    if (this.occupied / this.capacity >= this.loadFactor) {
      this.resize();
    }
    const hashCode = this.hash(key);
    if (!this.has(key)) {
      const newNode = new Node(key);
      if (this.bucketsArray[hashCode] === null) {
        this.occupied += 1;
        this.bucketsArray[hashCode] = newNode;
      } else {
        let current = this.bucketsArray[hashCode];
        while (current.next !== null) {
          current = current.next;
        }
        current.next = newNode;
      }
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    let current = this.bucketsArray[hashCode];
    while (current.key !== null && current.key !== key) {
      current = current.next;
    }
    if (current === null) {
      return null;
    }
    return current.key;
  }

  has(key) {
    const hashCode = this.hash(key);
    let current = this.bucketsArray[hashCode];
    while (current !== null) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    let current = this.bucketsArray[hashCode];
    let previous = null;

    while (current !== null && current.key !== key) {
      previous = current;
      current = current.next;
    }

    if (current === null) {
      return;
    }

    if (previous === null && current.next === null) {
      this.occupied -= 1;
      this.bucketsArray[hashCode] = current.next;
    } else if (previous === null) {
      this.bucketsArray[hashCode] = current.next;
    } else {
      previous.next = current.next;
    }
  }

  length() {
    let counter = 0;
    this.bucketsArray.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        counter += 1;
        while (current.next !== null) {
          counter += 1;
          current = current.next;
        }
      }
    });
    return counter;
  }

  clear() {
    this.bucketsArray = new Array(16).fill(null);
    this.occupied = 0;
  }

  keys() {
    const arrayOfKeys = [];
    this.bucketsArray.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        arrayOfKeys.push(current.key);
        while (current.next !== null) {
          current = current.next;
          arrayOfKeys.push(current.key);
        }
      }
    });
    return arrayOfKeys;
  }
}
