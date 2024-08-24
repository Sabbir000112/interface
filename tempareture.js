console.clear();
let arr=[12,3,5,4,15,31];
let max;
for ( var i=1; i<arr.length; i++){
    max= arr[0];
    if(max<arr[i]){
        max=arr[i];
    }
}
console.log(max);