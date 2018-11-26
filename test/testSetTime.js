// setTimeout(() => {
//     console.log('1')
//     console.error(new Date().getTime(), '1')
//     setTimeout(() => {
//         console.log('2')
//     }, 100)
// }, 100)

// setTimeout(() => {
//     console.error(new Date().getTime(), '2')
//     console.log('3')
//     setTimeout(() => {
//         console.log('4')
//     }, 0)
// }, 200)

console.log(new Date().getTime())
setTimeout(() => {
    console.log(new Date().getTime())
}, 0)