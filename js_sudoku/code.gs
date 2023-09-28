
function possibility(x,y,arr){
  let _x = (Math.floor(x/3))*3;
  let _y = (Math.floor(y/3))*3;
  let rs = arr[y];
  let cs=[];
  for (const i of arr){
    cs.push(i[x]);
  }

  let a = arr[_y  ].slice(_x,_x+3);
  let b = arr[_y+1].slice(_x,_x+3);
  let c = arr[_y+2].slice(_x,_x+3);

  let rlist = [];
  for (let i=0;i<10;i++){
    if (!(
      rs.includes(i)||
      cs.includes(i)||
      a.includes(i)||
      b.includes(i)||
      c.includes(i)
    )){
      rlist.push(i);
    }
  }
  return rlist;
}


function find_zero(arr){
  let y = 0;
  for (const row of arr){
    let x = 0;
    for (const d of row){
      if (d==0){
        return [x,y];
      }
      x++;
    }
    y++;
  }
}

function deepcopy(obj){
  return JSON.parse(JSON.stringify(obj));
}

function solver(arr){
  if(arr.some(row=>row.includes(0))){
    let [x,y] = find_zero(arr);
    let plist = possibility(x,y,arr);
    if (plist.length==0){
      return false;
    }
    for (const i of plist){
      var new_arr = deepcopy(arr);
      new_arr[y][x]=i;
      let s = solver(new_arr);
      if (s){
        return s;
      }
    }
    //通常ここには来ない
  }else{
    return arr;
  }
}

function main(){
  console.time("js_sudoku_solver")
  console.log(solver(q_0))
  console.timeEnd("js_sudoku_solver")
}

