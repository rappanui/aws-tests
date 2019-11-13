let arr = [
    {teste: "a", num:  1, desc: "xxxx"}, 
    {teste: "b", num: 2, desc: "yyyyy"}
];

let nArr = arr.map((item) => {
    return [item.teste, item.desc];
});

console.log("item:", JSON.stringify(nArr, null, 2));