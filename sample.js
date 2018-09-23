function smallestCommons(arr) {
  return arr[1];
}


const gcd = (a, b) => {
    if(a==0)
        return b;
    return gcd(b%a, a);
}



console.log(gcd([10,5]));