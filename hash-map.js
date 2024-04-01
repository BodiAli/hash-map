class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.bucketsArray = new Array(16).fill(null);
    this.loadFactor = 0.75;
    this.capacity = this.bucketsArray.length;
    this.occupied = 0;
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
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }

    return hashCode;
  }
  set(key, value) {
    if (this.occupied / this.capacity >= this.loadFactor) {
      this.resize();
    }
    const hashCode = this.hash(key);
    if (!this.has(key)) {
      const newNode = new Node(key, value);
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
    } else {
      let current = this.bucketsArray[hashCode];
      while (current !== null && current.key !== key) {
        current = current.next;
      }
      if (current !== null) {
        current.value = value;
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
    if ((previous === null) & (current.next === null)) {
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
  values() {
    const arrayOfValues = [];
    this.bucketsArray.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        arrayOfValues.push(current.value);
        while (current.next !== null) {
          current = current.next;
          arrayOfValues.push(current.value);
        }
      }
    });
    return arrayOfValues;
  }
  entries() {
    const arrayOfEntries = [];
    this.bucketsArray.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        arrayOfEntries.push([current.key, current.value]);
        while (current.next !== null) {
          current = current.next;
          arrayOfEntries.push([current.key, current.value]);
        }
      }
    });
    return arrayOfEntries;
  }
}

const hashMap = new HashMap();
hashMap.set("bodi", "ali");
hashMap.set("bodi", "kool");
hashMap.set("bodii", "koaol");
hashMap.set("b", "koaol");
console.log(hashMap);
console.log(hashMap.entries()); /* 
(3) [Array(2), Array(2), Array(2)]
0: (2) ['bodi', 'kool']
1: (2) ['b', 'koaol']
2: (2) ['bodii', 'koaol']
length: 3 
*/
