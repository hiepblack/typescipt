// Array
// const array: Array<number> = [1, 2, 3];
// const array2: number[] = [1, 2, 3];
// const array3: string[] = ["a", "b", "c"];
// const array6: number[][] = [[1, 2], [1, 2]];
// any
// let array5: any = 1;
// array5 = "hello";
// tuples
// const array4: (string | number)[] = [1, 2, "3"];
// enum
// enum STATUS {
//     PENDING = 200,
//     REJECTED = 1,
//     FULFILLED = 2
// }
// const trangthai2: STATUS = STATUS.PENDING;
// const uppercase = (a: string | number): string => {
//     return a.toString().toUpperCase();
// }
// function fun1(): number {
//     return
// }
// function fun2(a: number, b: number): number {
//     return a + b;
// }
// function fun3(a: string[]): string[] {
//     return a
// }
// function fun4(a: { name: string, age: number }): {} {
//     return a
// }
// function fun5(): void {
// }
// function fun6(a: string): string {
//     return a;
// }
// const showInfo = (a: string, ...b: string[]): any => {
//     return [a, b]
// }
// const newmap = (arr: number[], callback?: (item: number) => number) => {
//     const temp = [];
//     for (let i = 0; i < arr.length; i++) {
//         const newarr = callback(arr[i])
//         temp.push(newarr)
//     }
//     return temp;
// }
// const result = newmap([1, 2, 3], (item) => {
//     return item * 2
// })
// enum ROLE {
//     USER,
//     ADMIN,
//     MANAGER,
// }
// interface IUser {
//     username:string,
//     password:string,
//     roles:ROLE.USER | ROLE.ADMIN | ROLE.MANAGER
// }
// interface IAdmin extends IUser {
//     login: ()=>void
//     logout: ()=>void
// }
// interface IManager extends IUser {
//     deleteUser: ()=>void,
//     addUser: ()=>void,
//     editUser: ()=>void,
//     roles:ROLE.MANAGER
// }
// type User = {
//     username: string,
//     password: string,
//     login: () => void,
//     logout: () => void,
// }
// type Admin = User & {
//     deleteUser: () => void,
//     addUser: () => void,
//     updateUser: () => void,
// }
// interface IUser {
//     name: string,
//     age: number
// }
// const arr: IUser[] = [
//     { name: 'John', age: 12 },
//     { name: 'John', age: 12 }
// ]
// function we17304_map<T>(arr: T[], cb: (item: T) => T): T[] {
//     let temp = [];
//     for (let i = 0; i < arr.length; i++) {
//         const newArr = cb(arr[i]);
//         temp.push(newArr);
//     }
//     return temp;
// }
// const newArr = we17304_map(arr,(item)=>{
//     return {name:item.name,age:item.age*2}
// })
// console.log(newArr);
function sort_We17304(array, cb) {
    if (cb && typeof (cb) === "function") {
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (cb(array[i], array[j]) > 0) {
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
        }
    }
    else {
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (array[i] == array[j]) {
                    console.log("abc");
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
        }
    }
}
var arr_test = [1, 5, 3, 7];
sort_We17304(arr_test);
console.log(arr_test);
