function hash32shift(key) {
	key = ~key + (key << 15) // key = (key << 15) - key - 1;
	key = key ^ (key >>> 12)
	key = key + (key << 2)
	key = key ^ (key >>> 4)
	key = key * 2057 // key = (key + (key << 3)) + (key << 11);
	key = key ^ (key >>> 16)
	return key
}

// console.log(hash32shift(123))