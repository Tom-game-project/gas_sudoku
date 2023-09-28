const wasmBytes = Utilities.base64Decode(WASMBASE64);
const buffer = new Uint8Array(wasmBytes).buffer;

// Wasmモジュールをインスタンス化
const module = new WebAssembly.Module(buffer);
const instance = new WebAssembly.Instance(module);

const wasm = instance.exports;


let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}
let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

/**
* @param {Uint8Array} arr
* @returns {Uint8Array}
*/
function sudoku_solver(arr) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(arr, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sudoku(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v2;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function sudoku_reshape(rarr){
  let rlist=[];
  for (let i =0;i<9;i++){
    let group=[]
    for (let j =0;j<9;j++){
      group.push(rarr[(i*9+j).toString()])
    }
    rlist.push(group);
  }
  return rlist;
}

function main(){
  console.time("wasm_sudoku_solver")
  let a=sudoku_solver(q_0)
  console.log(
    sudoku_reshape(a)
  )
  console.timeEnd("wasm_sudoku_solver")
}

